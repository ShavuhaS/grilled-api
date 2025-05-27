import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { CourseCategoryMapper } from './mappers/course-category.mapper';
import { CourseCategoryDocumentation } from '../../common/documentation/modules/course-category';
import { ApiTags } from '@nestjs/swagger';
import { CourseCategoryByIdPipe } from '../../common/pipes/course-category-by-id.pipe';
import { AttachEntitiesDto } from '../../common/dtos/attach-entities.dto';
import { User } from '../../common/decorators/user.decorator';
import { DbUser } from '../../database/entities/user.entity';
import { DetachEntitiesDto } from '../../common/dtos/detach-entities.dto';
import { CourseCategoryPolicies } from '../casl/policies/course-category';
import { SetAbilityFactory } from '../../common/guards/casl/set-ability-factory.meta';
import { CourseCategoryAbilityFactory } from '../casl/factories/course-category-ability.factory';

@ApiTags('Course Categories')
@Controller({
  path: '/courseCategories',
  version: '1',
})
@SetAbilityFactory(CourseCategoryAbilityFactory)
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

  @ApiEndpoint({
    summary: 'Follow course categories',
    documentation: CourseCategoryDocumentation.FOLLOW,
    policies: CourseCategoryPolicies.FOLLOW,
  })
  @Post('/follow')
  async followSkills(
    @Body('ids', CourseCategoryByIdPipe) ids: string[],
    @Body() body: AttachEntitiesDto,
    @User() user: DbUser,
  ) {
    await this.categoryService.addFolower(ids, user.id);
    const categories = await this.categoryService.getFollowedBy(user.id);
    return categories.map((category) =>
      this.categoryMapper.toBaseCourseCategoryResponse(category),
    );
  }

  @ApiEndpoint({
    summary: 'Unfollow course categories',
    documentation: CourseCategoryDocumentation.UNFOLLOW,
    policies: CourseCategoryPolicies.UNFOLLOW,
  })
  @Post('/unfollow')
  async unfollowSkills(
    @Body('ids', CourseCategoryByIdPipe) ids: string[],
    @Body() body: DetachEntitiesDto,
    @User() user: DbUser,
  ) {
    await this.categoryService.removeFolower(ids, user.id);
    const categories = await this.categoryService.getFollowedBy(user.id);
    return categories.map((category) =>
      this.categoryMapper.toBaseCourseCategoryResponse(category),
    );
  }
}
