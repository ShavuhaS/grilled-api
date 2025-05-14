import { Injectable } from '@nestjs/common';
import { DbCourseModule } from '../../../database/entities/course-module.entity';
import { CourseModuleResponse } from '../../../common/responses/course-module.response';
import { CourseLessonMapper } from './course-lesson.mapper';
import { BaseCourseModuleResponse } from '../../../common/responses/base-course-module.response';
import { ModuleMappingOptions } from '../interfaces/mapping-options.interfaces';

@Injectable()
export class CourseModuleMapper {
  constructor (private lessonMapper: CourseLessonMapper) {}

  toBaseCourseModuleResponse (module: DbCourseModule): BaseCourseModuleResponse {
    return {
      id: module.id,
      name: module.name,
      estimatedTime: module.estimatedTime,
      number: module.order,
    };
  }

  toCourseModuleResponse (
    module: DbCourseModule,
    { links, progress, completed }: ModuleMappingOptions,
  ): CourseModuleResponse {
    const lessons = module.lessons?.map((lesson, ind) =>
      this.lessonMapper.toLessonResponse(lesson, {
        links,
        completed: completed?.[ind],
      })
    ) ?? [];

    return {
      ...this.toBaseCourseModuleResponse(module),
      progress: progress && +progress.toFixed(1),
      lessons,
    };
  }
}
