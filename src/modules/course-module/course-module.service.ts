import { Injectable } from '@nestjs/common';
import { CreateCourseModuleDto } from '../../common/dtos/create-course-module.dto';
import { DbCourseModule } from '../../database/entities/course-module.entity';
import { CourseModuleRepository } from '../../database/repositories/course-module.repository';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CourseEvent } from '../../common/enums/course-event.enum';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';
import { LessonDurationChangedEvent } from '../../common/events/lesson-duration-changed.event';
import { ModuleDurationChangedEvent } from '../../common/events/module-duration-changed.event';

@Injectable()
export class CourseModuleService {
  constructor(
    private moduleRepository: CourseModuleRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(
    courseId: string,
    body: CreateCourseModuleDto,
  ): Promise<DbCourseModule> {
    const modules = await this.moduleRepository.findMany(
      { courseId },
      undefined,
      { order: 'desc' },
    );

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

  async deleteById(id: string): Promise<DbCourseModule> {
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

    this.eventEmitter.emit(
      CourseEvent.MODULE_DURATION_UPDATED,
      new ModuleDurationChangedEvent(
        module.id,
        module.courseId,
        -module.estimatedTime,
      ),
    );

    return module;
  }

  @OnEvent(CourseEvent.LESSON_DURATION_UPDATED)
  private async updateEstimatedTime({
    moduleId,
    durationDelta,
  }: LessonDurationChangedEvent) {
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
