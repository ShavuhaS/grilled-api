import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository } from '../../database/repositories/course-category.repository';
import { EntityByIdPipe } from './entity-by-id.pipe';

@Injectable()
export class CourseCategoryByIdPipe extends EntityByIdPipe {
  constructor(private courseCategoryRepository: CourseCategoryRepository) {
    super(courseCategoryRepository, 'Course Category');
  }
}
