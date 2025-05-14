import { ApiProperty } from '@nestjs/swagger';
import { BaseCourseCategoryResponse } from './base-course-category.response';

export class CourseCategoriesResponse {
  @ApiProperty({
    description: 'Course categories',
    type: [BaseCourseCategoryResponse],
  })
    categories: BaseCourseCategoryResponse[];
}
