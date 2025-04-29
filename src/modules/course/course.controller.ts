import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SetAbilityFactory } from '../../common/guards/casl/set-ability-factory.meta';
import { CourseAbilityFactory } from '../casl/factories/course-ability.factory';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { CoursePolicies } from '../casl/policies/course';
import { CourseDocumentation } from '../../common/documentation/modules/course';
import { CourseCategoryByIdPipe } from '../../common/pipes/course-category-by-id.pipe';
import { CreateCourseDto } from '../../common/dtos/create-course.dto';
import { CourseService } from './course.service';
import { CourseMapper } from './mappers/course.mapper';
import { CourseByIdPipe } from '../../common/pipes/course-by-id.pipe';
import { CreateCourseModuleDto } from '../../common/dtos/create-course-module.dto';
import { CourseModuleMapper } from './mappers/course-module.mapper';
import { ModuleByIdPipe } from '../../common/pipes/module-by-id.pipe';

@ApiTags('Courses')
@Controller({
  path: '/courses',
  version: '1',
})
@SetAbilityFactory(CourseAbilityFactory)
export class CourseController {
  constructor (
    private courseService: CourseService,
    private courseMapper: CourseMapper,
    private moduleMapper: CourseModuleMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Create a new course',
    documentation: CourseDocumentation.CREATE,
    policies: CoursePolicies.CREATE,
  })
  @Post('/')
  async create (
    @Body('categoryId', CourseCategoryByIdPipe) categoryId: string,
    @Body() body: CreateCourseDto,
    @Request() req,
  ) {
    const course = await this.courseService.create(req.user, body);
    return this.courseMapper.toBaseCourseResponse(course);
  }

  @ApiEndpoint({
    summary: 'Get course by id',
    documentation: CourseDocumentation.GET,
  })
  @Get('/:courseId')
  async get (@Param('courseId', CourseByIdPipe) courseId: string) {
    const course = await this.courseService.getById(courseId);
    return this.courseMapper.toCourseResponse(course);
  }

  @ApiEndpoint({
    summary: 'Create course module',
    documentation: CourseDocumentation.CREATE_MODULE,
    policies: CoursePolicies.UPDATE,
  })
  @Post('/:courseId/modules')
  async createModule (
    @Param('courseId', CourseByIdPipe) courseId: string,
    @Body() body: CreateCourseModuleDto,
  ) {
    const module = await this.courseService.createModule(courseId, body);
    return this.moduleMapper.toBaseCourseModuleResponse(module);
  }

  @ApiEndpoint({
    summary: 'Delete course module',
    policies: CoursePolicies.MODULE_DELETE,
  })
  @Delete('/modules/:moduleId')
  async deleteModule (@Param('moduleId', ModuleByIdPipe) moduleId: string) {
    return await this.courseService.deleteModule(moduleId);
  }

  @ApiEndpoint({
    summary: 'Enroll onto a course',
    documentation: CourseDocumentation.ENROLL,
    policies: CoursePolicies.ENROLL,
  })
  @Post('/:courseId/enroll')
  async enroll () {
    return 'Test';
  }
}
