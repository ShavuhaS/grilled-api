import { Injectable } from '@nestjs/common';
import { BaseCoursePolicy } from './base';
import { CourseRepository } from '../../../../database/repositories/course.repository';
import { CourseAction } from '../../actions/course-action.enum';

@Injectable()
export class CourseCompletePolicy extends BaseCoursePolicy {
  constructor(private courseRepository: CourseRepository) {
    super(courseRepository, CourseAction.COMPLETE);
  }
}
