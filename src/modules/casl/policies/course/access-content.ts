import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../../../database/repositories/course.repository';
import { BaseCoursePolicy } from './base';
import { CourseAction } from '../../actions/course-action.enum';

@Injectable()
export class CourseAccessContentPolicy extends BaseCoursePolicy {
  constructor(private courseRepository: CourseRepository) {
    super(courseRepository, CourseAction.ACCESS_CONTENT);
  }
}
