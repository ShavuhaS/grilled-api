import { CourseRepository } from '../../../../database/repositories/course.repository';
import { Injectable } from '@nestjs/common';
import { BaseCoursePolicy } from './base';
import { CourseAction } from '../../actions/course-action.enum';

@Injectable()
export class CourseEnrollPolicy extends BaseCoursePolicy {
  constructor(private courseRepository: CourseRepository) {
    super(courseRepository, CourseAction.ENROLL);
  }
}
