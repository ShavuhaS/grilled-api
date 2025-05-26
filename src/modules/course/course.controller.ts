import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { LessonByIdPipe } from '../../common/pipes/lesson-by-id.pipe';
import { VideoValidationPipe } from '../../common/pipes/video-validation.pipe';
import { UpdateArticleDto } from '../../common/dtos/update-article.dto';
import { UpdateLessonDto } from '../../common/dtos/update-lesson.dto';
import { CheckEditableResponse } from '../../common/responses/check-editable.response';
import { UpdateCourseDto } from '../../common/dtos/update-course.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FILE_PROCESSED_EVENT } from '../upload/events/file-processed.event';
import { FileProcessedEvent } from '../../common/events/file-processed.event';
import { AvatarValidationPipe } from '../../common/pipes/avatar-validation.pipe';
import { QueryCoursesDto } from '../../common/dtos/query-courses.dto';
import { OrderByPipe } from '../../common/pipes/order-by.pipe';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { DbCourse } from '../../database/entities/course.entity';

@ApiTags('Courses')
@ApiExtraModels(...CourseExtraModels)
@Controller({
  path: '/courses',
  version: '1',
})
@SetAbilityFactory(CourseAbilityFactory)
export class CourseController {
  constructor(
    private courseService: CourseService,
    private moduleService: CourseModuleService,
    private courseMapper: CourseMapper,
    private moduleMapper: CourseModuleMapper,
    private lessonMapper: LessonMapper,
    private eventEmitter: EventEmitter2,
  ) {}

  @ApiEndpoint({
    summary: 'Create a new course',
    documentation: CourseDocumentation.CREATE,
    policies: CoursePolicies.CREATE,
  })
  @Post('/')
  async create(
    @Body('categoryId', CourseCategoryByIdPipe) categoryId: string,
    @Body() body: CreateCourseDto,
    @User() user: DbUser,
  ) {
    const course = await this.courseService.create(user, body);
    return this.courseMapper.toBaseCourseResponse(course);
  }

  @ApiEndpoint({
    summary: 'Get course by id',
    documentation: CourseDocumentation.GET,
    guards: OptionalJwtGuard,
  })
  @Get('/:courseId')
  async get(
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
    summary: 'Get all courses',
    documentation: CourseDocumentation.GET_ALL,
    guards: OptionalJwtGuard,
  })
  @Get('/')
  async getAll(
    @Query('orderBy', new OrderByPipe(DbCourse)) orderBy: OrderByDto,
    @Query() query: QueryCoursesDto,
    @User() user: DbUser,
  ) {
    const courses = await this.courseService.getAll(user, query, orderBy);
    return this.courseMapper.toPaginatedCoursesResponse(courses);
  }

  @ApiEndpoint({
    summary: 'Update course info',
    documentation: CourseDocumentation.UPDATE,
    policies: CoursePolicies.UPDATE,
  })
  @Patch('/:courseId')
  async update(
    @Param('courseId', CourseByIdPipe) courseId: string,
    @Body('categoryId', CourseCategoryByIdPipe) categoryId: string,
    @Body() body: UpdateCourseDto,
  ) {
    const course = await this.courseService.update(courseId, body);
    return this.courseMapper.toBaseCourseResponse(course);
  }

  @ApiEndpoint({
    summary: 'Update course avatar',
    documentation: CourseDocumentation.UPDATE_AVATAR,
    policies: CoursePolicies.UPDATE,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('/:courseId/avatar')
  async updateAvatar(
    @Param('courseId', CourseByIdPipe) courseId: string,
    @UploadedFile(AvatarValidationPipe) file: Express.Multer.File,
  ) {
    try {
      const course = await this.courseService.uploadAvatar(courseId, file);
      return this.courseMapper.toBaseCourseResponse(course);
    } finally {
      this.eventEmitter.emit(
        FILE_PROCESSED_EVENT,
        new FileProcessedEvent(file.path),
      );
    }
  }

  @ApiEndpoint({
    summary: 'Create course module',
    documentation: CourseDocumentation.CREATE_MODULE,
    policies: CoursePolicies.MODULE_CREATE,
  })
  @Post('/:courseId/modules')
  async createModule(
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
  async deleteModule(
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
  async createLesson(
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
    summary: 'Get course lesson info (for enrolled student and teacher)',
    documentation: CourseDocumentation.GET_LESSON,
    policies: CoursePolicies.ACCESS_CONTENT,
  })
  @Get('/:courseId/lessons/:lessonId')
  async getLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @User() user: DbUser,
  ) {
    const lesson = await this.courseService.getLesson(courseId, lessonId);
    const context = await this.courseService.getLessonUserContext(user, lesson);

    if (!context.isStudent) {
      return this.lessonMapper.toLessonTeacherResponse(lesson);
    }

    return this.lessonMapper.toLessonStudentResponse(lesson, context);
  }

  @ApiEndpoint({
    summary: 'Delete a course lesson',
    documentation: CourseDocumentation.DELETE_LESSON,
    policies: CoursePolicies.LESSON_DELETE,
  })
  @Delete('/:courseId/lessons/:lessonId')
  async deleteLesson(
    @Param('courseId', CourseByIdPipe) courseId: string,
    @Param('lessonId', LessonByIdPipe) lessonId: string,
  ) {
    const lesson = await this.courseService.deleteLesson(courseId, lessonId);
    return this.lessonMapper.toLessonResponse(lesson, { links: true });
  }

  @ApiEndpoint({
    summary: 'Upload a video to a lesson of type VIDEO',
    documentation: CourseDocumentation.UPLOAD_VIDEO,
    policies: CoursePolicies.VIDEO_UPLOAD,
  })
  @UseInterceptors(FileInterceptor('video'))
  @Patch('/:courseId/lessons/:lessonId/video')
  async uploadVideo(
    @Param('courseId') courseId: string,
    @Param('lessonId', LessonByIdPipe) lessonId: string,
    @UploadedFile(VideoValidationPipe) file: Express.Multer.File,
  ) {
    try {
      const lesson = await this.courseService.uploadVideo(
        courseId,
        lessonId,
        file,
      );
      return this.lessonMapper.toVideoLessonTeacherResponse(lesson);
    } finally {
      this.eventEmitter.emit(
        FILE_PROCESSED_EVENT,
        new FileProcessedEvent(file.path),
      );
    }
  }

  @ApiEndpoint({
    summary: 'Update content on a lesson of type ARTICLE',
    documentation: CourseDocumentation.UPDATE_ARTICLE,
    policies: CoursePolicies.ARTICLE_UPDATE,
  })
  @Patch('/:courseId/lessons/:lessonId/article')
  async updateArticle(
    @Param('courseId', CourseByIdPipe) courseId: string,
    @Param('lessonId', LessonByIdPipe) lessonId: string,
    @Body() body: UpdateArticleDto,
  ) {
    const lesson = await this.courseService.updateArticle(
      courseId,
      lessonId,
      body,
    );
    return this.lessonMapper.toArticleLessonTeacherResponse(lesson);
  }

  @ApiEndpoint({
    summary: 'Update lesson info',
    documentation: CourseDocumentation.UPDATE_LESSON,
    policies: CoursePolicies.LESSON_UPDATE,
  })
  @Patch('/:courseId/lessons/:lessonId')
  async updateLesson(
    @Param('courseId', CourseByIdPipe) courseId: string,
    @Param('lessonId', LessonByIdPipe) lessonId: string,
    @Body() body: UpdateLessonDto,
  ) {
    const lesson = await this.courseService.updateLesson(
      courseId,
      lessonId,
      body,
    );
    return this.lessonMapper.toLessonTeacherResponse(lesson);
  }

  @ApiEndpoint({
    summary: 'Mark a lesson as completed',
    documentation: CourseDocumentation.COMPLETE_LESSON,
    policies: CoursePolicies.COMPLETE,
  })
  @Post('/:courseId/lessons/:lessonId/complete')
  async completeLesson(
    @Param('courseId', CourseByIdPipe) courseId: string,
    @Param('lessonId', LessonByIdPipe) lessonId: string,
    @User() user: DbUser,
  ) {
    await this.courseService.completeLesson(user, courseId, lessonId);
  }

  @ApiEndpoint({
    summary: 'Check if the course is editable',
    documentation: CourseDocumentation.CHECK_EDITABLE,
    policies: CoursePolicies.CHECK_STATUS,
  })
  @Get('/:courseId/editable')
  async checkEditable(@Param('courseId', CourseByIdPipe) courseId: string) {
    const isEditable = await this.courseService.isEditable(courseId);
    return { isEditable } as CheckEditableResponse;
  }

  @ApiEndpoint({
    summary: 'Publish the course',
    documentation: CourseDocumentation.PUBLISH,
    policies: CoursePolicies.PUBLISH,
  })
  @Post('/:courseId/publish')
  async publish(@Param('courseId', CourseByIdPipe) courseId: string) {
    await this.courseService.publishById(courseId);
  }

  @ApiEndpoint({
    summary: 'Enroll onto a course',
    documentation: CourseDocumentation.ENROLL,
    policies: CoursePolicies.ENROLL,
  })
  @Post('/:courseId/enroll')
  async enroll(
    @Param('courseId', CourseByIdPipe) courseId: string,
    @User() user: DbUser,
  ) {
    await this.courseService.enrollUser(user.id, courseId);
  }
}
