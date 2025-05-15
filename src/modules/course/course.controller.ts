import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
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
import { CourseModuleMapper } from '../course-module/mappers/course-module.mapper';
import { ModuleByIdPipe } from '../../common/pipes/module-by-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateLessonDto } from '../../common/dtos/create-lesson.dto';
import { OptionalJwtGuard } from '../../common/guards/auth/optional-jwt.guard';
import { DbUser } from '../../database/entities/user.entity';
import { User } from '../../common/decorators/user.decorator';
import { CourseExtraModels } from '../../common/documentation/extra-models/course.models';
import { LessonMapper } from '../lesson/mappers/lesson.mapper';
import { CourseModuleService } from '../course-module/course-module.service';

@ApiTags('Courses')
@ApiExtraModels(...CourseExtraModels)
@Controller({
  path: '/courses',
  version: '1',
})
@SetAbilityFactory(CourseAbilityFactory)
export class CourseController {
  constructor (
    private courseService: CourseService,
    private moduleService: CourseModuleService,
    private courseMapper: CourseMapper,
    private moduleMapper: CourseModuleMapper,
    private lessonMapper: LessonMapper,
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
    guards: OptionalJwtGuard,
  })
  @Get('/:courseId')
  async get (
    @Param('courseId', CourseByIdPipe) courseId: string,
    @User() user: DbUser,
  ) {
    const course = await this.courseService.getById(courseId);
    const mappingOptions = await this.courseService.personalizeCourseResponse(
      user,
      course,
    );

    return this.courseMapper.toCourseResponse(course, mappingOptions);
  }

  @ApiEndpoint({
    summary: 'Create course module',
    documentation: CourseDocumentation.CREATE_MODULE,
    policies: CoursePolicies.MODULE_CREATE,
  })
  @Post('/:courseId/modules')
  async createModule (
    @Param('courseId', CourseByIdPipe) courseId: string,
    @Body() body: CreateCourseModuleDto,
  ) {
    const module = await this.moduleService.create(courseId, body);
    return this.moduleMapper.toCourseModuleResponse(module, { links: true });
  }

  @ApiEndpoint({
    summary: 'Delete course module',
    policies: CoursePolicies.MODULE_DELETE,
  })
  @Delete('/:courseId/modules/:moduleId')
  async deleteModule (
    @Param('courseId') courseId: string,
    @Param('moduleId', ModuleByIdPipe) moduleId: string,
  ) {
    return this.courseService.deleteModule(courseId, moduleId);
  }

  @ApiEndpoint({
    summary: 'Create course lesson',
    documentation: CourseDocumentation.CREATE_LESSON,
    policies: CoursePolicies.LESSON_CREATE,
  })
  @Post('/:courseId/modules/:moduleId/lessons')
  async createLesson (
    @Param('courseId') courseId: string,
    @Param('moduleId', ModuleByIdPipe) moduleId: string,
    @Body() body: CreateLessonDto,
  ) {
    const lesson = await this.courseService.createLesson(
      courseId,
      moduleId,
      body,
    );
    return this.lessonMapper.toLessonTeacherResponse(lesson);
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
