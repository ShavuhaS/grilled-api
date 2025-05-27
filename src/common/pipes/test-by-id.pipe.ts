import { Injectable } from '@nestjs/common';
import { EntityByIdPipe } from './entity-by-id.pipe';
import { CourseTestRepository } from '../../database/repositories/course-test.repository';

@Injectable()
export class TestByIdPipe extends EntityByIdPipe {
  constructor(private testRepository: CourseTestRepository) {
    super(testRepository, 'Test');
  }
}
