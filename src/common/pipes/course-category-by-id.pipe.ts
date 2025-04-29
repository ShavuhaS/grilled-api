import { Injectable, PipeTransform } from '@nestjs/common';
import { CourseCategoryRepository } from '../../database/repositories/course-category.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class CourseCategoryByIdPipe implements PipeTransform {
  constructor (private courseCategoryRepository: CourseCategoryRepository) {}

  async transform (id: string): Promise<string> {
    const category = await this.courseCategoryRepository.findById(id);

    if (!category) {
      throw new InvalidEntityIdException('Course Category');
    }

    return id;
  }
}