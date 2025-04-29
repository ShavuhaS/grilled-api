import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository } from '../../database/repositories/course-category.repository';
import { DbCourseCategory } from '../../database/entities/course-category.entity';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';

@Injectable()
export class CourseCategoryService {
  constructor (private categoryRepository: CourseCategoryRepository) {}

  async getAllRootCategories (): Promise<DbCourseCategory[]> {
    return this.categoryRepository.findMany({
      parent: null,
    });
  }

  async getWithSubcategories (id: string): Promise<DbCourseCategory> {
    const category = await this.categoryRepository.findById(id, {
      subcategories: true,
    });

    if (!category) {
      throw new InvalidEntityIdException('Course Category');
    }

    return category;
  }
}
