import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository } from '../../database/repositories/course-category.repository';
import { DbCourseCategory } from '../../database/entities/course-category.entity';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';

@Injectable()
export class CourseCategoryService {
  constructor(private categoryRepository: CourseCategoryRepository) {}

  async getAllRootCategories(): Promise<DbCourseCategory[]> {
    return this.categoryRepository.findMany({
      parent: null,
    });
  }

  async getWithSubcategories(id: string): Promise<DbCourseCategory> {
    const category = await this.categoryRepository.findById(id, {
      subcategories: true,
    });

    if (!category) {
      throw new InvalidEntityIdException('Course Category');
    }

    return category;
  }

  async getFollowedBy(userId: string): Promise<DbCourseCategory[]> {
    return this.categoryRepository.findMany({
      followers: { some: { userId } },
    });
  }

  async addFolower(ids: string[], userId: string) {
    const categories = await this.getFollowedBy(userId);
    const categorySet = new Set(categories.map(({ id }) => id));

    const toAdd = [];
    for (const id of ids) {
      if (!categorySet.has(id)) {
        toAdd.push(id);
      }
    }

    for (const id of toAdd) {
      await this.categoryRepository.updateById(id, {
        followers: { create: { userId } },
      });
    }
  }

  async removeFolower(ids: string[], userId: string) {
    const categories = await this.getFollowedBy(userId);
    const categoriesSet = new Set(categories.map(({ id }) => id));

    const toRemove = [];
    for (const id of ids) {
      if (categoriesSet.has(id)) {
        toRemove.push(id);
      }
    }

    for (const id of toRemove) {
      await this.categoryRepository.updateById(id, {
        followers: {
          delete: {
            userId_categoryId: {
              userId,
              categoryId: id,
            },
          },
        },
      });
    }
  }
}
