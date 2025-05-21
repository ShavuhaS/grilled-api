import { Injectable } from '@nestjs/common';
import { CreateCourseModuleDto } from '../../common/dtos/create-course-module.dto';
import { DbCourseModule } from '../../database/entities/course-module.entity';
import { CourseModuleRepository } from '../../database/repositories/course-module.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { CourseEvent } from '../../common/enums/course-event.enum';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';
import { DurationUpdatedEvent } from '../../common/events/duration-updated.event';

@Injectable()
export class CourseModuleService {
  constructor (
    private moduleRepository: CourseModuleRepository,
  ) {}

  async create (
    courseId: string,
    body: CreateCourseModuleDto,
  ): Promise<DbCourseModule> {
    const modules = await this.moduleRepository.findMany({
      where: { courseId },
      orderBy: {
        order: 'desc',
      },
    });

    let order = 1;
    if (modules.length > 0) order = modules[0].order + 1;

    return this.moduleRepository.create(
      {
        ...body,
        order,
        course: {
          connect: { id: courseId },
        },
      },
      {
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    );
  }

  async deleteById (id: string): Promise<DbCourseModule> {
    const module = await this.moduleRepository.delete({ id });

    await this.moduleRepository.updateMany(
      {
        courseId: module.courseId,
        order: {
          gt: module.order,
        },
      },
      {
        order: {
          decrement: 1,
        },
      },
    );

    return module;
  }

  @OnEvent(CourseEvent.DURATION_UPDATED)
  private async updateEstimatedTime ({ moduleId, durationDelta }: DurationUpdatedEvent) {
    if (!durationDelta) {
      return;
    }

    const module = await this.moduleRepository.findById(moduleId);

    if (!module) {
      console.error(`Module with id ${moduleId} was not found`);
      return;
    }

    await this.moduleRepository.update(
      { id: module.id },
      { estimatedTime: { increment: durationDelta } },
    );
  }
}
