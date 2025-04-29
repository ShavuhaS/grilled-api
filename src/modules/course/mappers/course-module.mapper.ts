import { Injectable } from '@nestjs/common';
import { DbCourseModule } from '../../../database/entities/course-module.entity';
import { BaseCourseModuleResponse } from '../../../common/responses/base-course-module.response';
import { CourseLessonMapper } from './course-lesson.mapper';

@Injectable()
export class CourseModuleMapper {
  constructor (private lessonMapper: CourseLessonMapper) {}

  toBaseCourseModuleResponse (module: DbCourseModule): BaseCourseModuleResponse {
    return {
      id: module.id,
      name: module.name,
      estimatedTime: module.estimatedTime,
      number: module.order,
      lessons: module.lessons?.map((lesson) =>
        this.lessonMapper.toBaseCourseLessonResponse(lesson)
      ),
    };
  }
}