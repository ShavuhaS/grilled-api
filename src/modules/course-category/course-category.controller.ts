import { Controller, Get, Param } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { CourseCategoryMapper } from './mappers/course-category.mapper';
import { CourseCategoryDocumentation } from '../../common/documentation/modules/course-category';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Categories')
@Controller({
  path: '/courseCategories',
  version: '1',
})
export class CourseCategoryController {
  constructor(
    private categoryService: CourseCategoryService,
    private categoryMapper: CourseCategoryMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get all root course categories',
    documentation: CourseCategoryDocumentation.GET_ALL,
  })
  @Get('/')
  async getAll() {
    const categories = await this.categoryService.getAllRootCategories();
    return this.categoryMapper.toCourseCategoriesResponse(categories);
  }

  @ApiEndpoint({
    summary: 'Get course category with its highest subcategories',
    documentation: CourseCategoryDocumentation.GET,
  })
  @Get('/:id')
  async getWithSubcategories(@Param('id') categoryId: string) {
    const category =
      await this.categoryService.getWithSubcategories(categoryId);
    return this.categoryMapper.toCourseCategoryResponse(category);
  }
}
