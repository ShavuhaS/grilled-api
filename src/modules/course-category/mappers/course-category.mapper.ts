import { Injectable } from '@nestjs/common';
import { DbCourseCategory } from '../../../database/entities/course-category.entity';
import { BaseCourseCategoryResponse } from '../../../common/responses/base-course-category.response';
import { CourseCategoriesResponse } from '../../../common/responses/course-categories.response';
import { CourseCategoryResponse } from '../../../common/responses/course-category.response';

@Injectable()
export class CourseCategoryMapper {
  constructor () {}

  toBaseCourseCategoryResponse (category: DbCourseCategory): BaseCourseCategoryResponse {
    return {
      id: category.id,
      name: category.name,
    };
  }

  toCourseCategoriesResponse (categories: DbCourseCategory[]): CourseCategoriesResponse {
    return {
      categories: categories.map((category) => this.toBaseCourseCategoryResponse(category)),
    };
  }

  toCourseCategoryResponse ({ subcategories, ...category }: DbCourseCategory): CourseCategoryResponse {
    return {
      ...this.toBaseCourseCategoryResponse(category),
      subcategories: subcategories?.map((sub) => this.toBaseCourseCategoryResponse(sub)),
    };
  }
}