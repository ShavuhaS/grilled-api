import { Injectable } from '@nestjs/common';
import { CreateCourseModuleDto } from '../../common/dtos/create-course-module.dto';
import { DbCourseModule } from '../../database/entities/course-module.entity';
import { CourseModuleRepository } from '../../database/repositories/course-module.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { CourseEvent } from '../../common/enums/course-event.enum';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';

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

  @OnEvent(CourseEvent.LESSON_CREATED)
  private async updateEstimatedTime (lesson: DbCourseLesson) {
    if (!lesson.estimatedTime) {
      return;
    }

    const module = await this.moduleRepository.findFirst({
      lessons: { some: { id: lesson.id } },
    });

    if (!module) {
      console.error(`Module with lesson ${lesson.id} was not found`);
      return;
    }

    await this.moduleRepository.update(
      { id: module.id },
      { estimatedTime: { increment: lesson.estimatedTime } },
    );
  }
}
