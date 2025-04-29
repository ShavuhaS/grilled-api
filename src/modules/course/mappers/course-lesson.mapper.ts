import { Injectable } from '@nestjs/common';
import { DbCourseLesson } from '../../../database/entities/course-lesson.entity';
import { BaseCourseLessonResponse } from '../../../common/responses/base-course-lesson.response';

@Injectable()
export class CourseLessonMapper {
  constructor () {}

  toBaseCourseLessonResponse (lesson: DbCourseLesson): BaseCourseLessonResponse {
    return {
      id: lesson.id,
      name: lesson.name,
      type: lesson.type,
      estimatedTime: lesson.estimatedTime,
      number: lesson.order,
    };
  }
}