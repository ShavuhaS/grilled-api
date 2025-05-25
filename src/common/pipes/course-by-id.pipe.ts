import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../database/repositories/course.repository';
import { EntityByIdPipe } from './entity-by-id.pipe';

@Injectable()
export class CourseByIdPipe extends EntityByIdPipe {
  constructor(private courseRepository: CourseRepository) {
    super(courseRepository, 'Course');
  }
}
