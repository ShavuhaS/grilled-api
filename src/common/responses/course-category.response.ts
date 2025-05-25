import { BaseCourseCategoryResponse } from './base-course-category.response';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CourseCategoryResponse extends BaseCourseCategoryResponse {
  @ApiPropertyOptional({
    description: 'Course subcategories',
    type: [BaseCourseCategoryResponse],
  })
  subcategories?: BaseCourseCategoryResponse[];
}
