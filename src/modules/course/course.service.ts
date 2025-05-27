import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CourseRepository } from '../../database/repositories/course.repository';
import { CreateCourseDto } from '../../common/dtos/create-course.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { DbUser } from '../../database/entities/user.entity';
import { CourseModuleDisconnectionException } from '../../common/exceptions/course-module-disconnection.exception';
import { CreateLessonDto } from '../../common/dtos/create-lesson.dto';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';
import { CourseMappingOptions } from './interfaces/course-mapping-options.interface';
import { CourseProgress } from './interfaces/course-progress.interface';
import { ModuleProgress } from '../course-module/interfaces/module-progress.interface';
import { LessonService } from '../lesson/lesson.service';
import { CourseEvent } from '../../common/enums/course-event.enum';
import { CourseModuleService } from '../course-module/course-module.service';
import { CourseLessonDisconnectionException } from '../../common/exceptions/course-lesson-disconnection.exception';
import { LessonDurationChangedEvent } from '../../common/events/lesson-duration-changed.event';
import { LessonUserContext } from './types/lesson-user-context.type';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { UpdateArticleDto } from '../../common/dtos/update-article.dto';
import { IUpdateLessonDto } from '../../common/dtos/update-lesson.dto';
import { CourseStatusEnum } from '../../common/enums/course-status.enum';
import { EmptyCourseContentException } from '../../common/exceptions/empty-course-content.exception';
import { ModuleDurationChangedEvent } from '../../common/events/module-duration-changed.event';
import { UpdateCourseDto } from '../../common/dtos/update-course.dto';
import { StorageService } from '../storage/storage.service';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { QueryCoursesDto } from '../../common/dtos/query-courses.dto';
import { Paginated } from '../../database/interfaces/paginated.interface';
import { SearchUtil } from '../../database/utils/search.util';
import { RoleEnum } from '../../common/enums/role.enum';
import { Prisma } from '@prisma/client';
import { FilterUtil } from '../../database/utils/filter.util';
import { PaginationUtil } from '../../database/utils/pagination.util';
import { DbCourseModule } from '../../database/entities/course-module.entity';
import { UpdateCourseModuleDto } from '../../common/dtos/update-course-module.dto';
import { DbLessonTest } from '../../database/entities/lesson-test.entity';
import { CourseTestDisconnectionException } from '../../common/exceptions/course-test-disconnection.exception';
import { TestService } from '../test/test.service';
import { InvalidBodyException } from '../../common/exceptions/invalid-body.exception';

@Injectable()
export class CourseService {
  constructor(
    private courseRepository: CourseRepository,
    private moduleService: CourseModuleService,
    private lessonService: LessonService,
    private storageService: StorageService,
    private testService: TestService,
  ) {}

  async getById(id: string, signResources = false): Promise<DbCourse> {
    const course = await this.courseRepository.findById(id, {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              resources: true,
            },
          },
        },
      },
    });

    if (signResources) {
      await this.signCourseResources(course);
    } else {
      course.avatarLink =
        course.avatarLink &&
        (await this.storageService.getSignedUrl(course.avatarLink));
    }

    return course;
  }

  async getAll(
    query: QueryCoursesDto,
    orderBy: OrderByDto,
  ): Promise<Paginated<DbCourse>> {
    const { search, orderBy: _, pageSize, page, skillId, ...filter } = query;
    const pagination = { page, pageSize };

    const searchWhere = search
      ? SearchUtil.getFieldSearch<'course'>(search, 'name', 'level')
      : {};

    const filterWhere = FilterUtil.getFilter('DbCourse', filter);

    const skillFilter = Array.isArray(skillId?.in)
      ? {
        skills: {
          some: { skillId },
        },
      }
      : {};

    const where: Prisma.CourseWhereInput = {
      ...searchWhere,
      ...filterWhere,
      ...skillFilter,
      status: CourseStatusEnum.PUBLISHED,
    };

    const paginatedData = await PaginationUtil.paginate(
      this.courseRepository,
      { where, orderBy },
      pagination,
    );

    for (const course of paginatedData.data) {
      await this.signCourseResources(course);
    }

    return paginatedData;
  }

  private async signCourseResources(course: DbCourse): Promise<DbCourse> {
    if (course.avatarLink) {
      course.avatarLink = await this.storageService.getSignedUrl(
        course.avatarLink,
      );
    }

    if (!course.modules) {
      return course;
    }

    for (const module of course.modules) {
      if (!module.lessons) {
        continue;
      }
      for (const lesson of module.lessons) {
        await this.lessonService.signLessonResources(lesson);
      }
    }

    return course;
  }

  async create(user: DbUser, body: CreateCourseDto): Promise<DbCourse> {
    return this.courseRepository.create({
      ...body,
      authorId: user.id,
    });
  }

  async isUserOwner(userId: string, courseId: string): Promise<boolean> {
    const course = await this.courseRepository.findById(courseId);
    return this.ownsCourse(userId, course);
  }

  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    const enrollee = await this.courseRepository.findOne({
      id: courseId,
      enrollees: { some: { userId } },
    });

    return !!enrollee;
  }

  private async ownsCourse(userId: string, course: DbCourse): Promise<boolean> {
    return course.authorId === userId;
  }

  private async checkModuleConnected(courseId: string, moduleId: string) {
    const course = await this.courseRepository.findOne({
      id: courseId,
      modules: { some: { id: moduleId } },
    });

    if (!course) {
      throw new CourseModuleDisconnectionException();
    }
  }

  async updateModule(
    courseId: string,
    moduleId: string,
    body: UpdateCourseModuleDto,
  ): Promise<DbCourseModule> {
    await this.checkModuleConnected(courseId, moduleId);

    return this.moduleService.updateById(moduleId, body);
  }

  async deleteModule(courseId: string, moduleId: string) {
    await this.checkModuleConnected(courseId, moduleId);

    await this.moduleService.deleteById(moduleId);
  }

  async getUserProgress(
    user: DbUser,
    course: DbCourse,
  ): Promise<CourseProgress> {
    const completedLessons = await this.lessonService.getCompletedBy(
      user.id,
      course.id,
    );

    const completedSet = new Set(completedLessons.map(({ id }) => id));

    const modules: ModuleProgress[] = [];
    let completedCourse = 0;
    let totalCourse = 0;
    for (const module of course.modules) {
      const completed: boolean[] = module.lessons.map(({ id }) =>
        completedSet.has(id),
      );

      const completedModule = completed.filter((b) => b).length;
      const totalModule = module.lessons.length;
      completedCourse += completedModule;
      totalCourse += totalModule;

      modules.push({
        progress: 100 * (completedModule / totalModule),
        completed,
      });
    }
    const courseProgress = 100 * (completedCourse / totalCourse);

    return { course: courseProgress, modules };
  }

  async getLesson(courseId: string, lessonId: string): Promise<DbCourseLesson> {
    await this.checkLessonConnected(courseId, lessonId);

    return this.lessonService.getById(lessonId, true);
  }

  async getLessonUserContext(
    user: DbUser,
    lesson: DbCourseLesson,
  ): Promise<LessonUserContext> {
    const course = await this.courseRepository.findOne({
      modules: { some: { lessons: { some: { id: lesson.id } } } },
    });

    if (!course) {
      throw new InvalidEntityIdException('Lesson');
    }

    if (course.authorId === user.id) {
      return { isStudent: false };
    }

    return this.lessonService.getUserContext(user.id, lesson.id);
  }

  async personalizeCourseResponse(
    user: DbUser,
    course: DbCourse,
  ): Promise<CourseMappingOptions> {
    if (user === undefined || user === null) {
      return { links: false };
    }

    const isOwner = await this.ownsCourse(user.id, course);
    if (isOwner) {
      return { links: true };
    }

    const isEnrolled = await this.isUserEnrolled(user.id, course.id);
    if (isEnrolled) {
      return {
        links: true,
        progress: await this.getUserProgress(user, course),
      };
    }

    return { links: false };
  }

  async createLesson(
    courseId: string,
    moduleId: string,
    dto: CreateLessonDto,
  ): Promise<DbCourseLesson> {
    await this.checkModuleConnected(courseId, moduleId);

    return this.lessonService.create(courseId, moduleId, dto);
  }

  private async checkLessonConnected(courseId: string, lessonId: string) {
    const course = await this.courseRepository.findOne({
      modules: { some: { lessons: { some: { id: lessonId } } } },
    });

    if (!course) {
      throw new CourseLessonDisconnectionException();
    }
  }

  async deleteLesson(
    courseId: string,
    lessonId: string,
  ): Promise<DbCourseLesson> {
    await this.checkLessonConnected(courseId, lessonId);

    return this.lessonService.delete(lessonId);
  }

  async uploadAvatar(id: string, file: Express.Multer.File): Promise<DbCourse> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new InvalidEntityIdException('Course');
    }

    const { storagePath } = await this.storageService.uploadCourseAvatar(file);

    const oldLink = course.avatarLink;
    const updatedCourse = await this.courseRepository.updateById(id, {
      avatarLink: storagePath,
    });

    if (oldLink) {
      await this.storageService.deleteFile(oldLink);
    }

    updatedCourse.avatarLink =
      await this.storageService.getSignedUrl(storagePath);
    return updatedCourse;
  }

  async uploadVideo(
    courseId: string,
    lessonId: string,
    file: Express.Multer.File,
  ): Promise<DbCourseLesson> {
    await this.checkLessonConnected(courseId, lessonId);

    return await this.lessonService.uploadVideo(lessonId, file);
  }

  async update(id: string, body: UpdateCourseDto): Promise<DbCourse> {
    const course = await this.courseRepository.updateById(id, body);
    return this.signCourseResources(course);
  }

  async updateArticle(
    courseId: string,
    lessonId: string,
    body: UpdateArticleDto,
  ): Promise<DbCourseLesson> {
    await this.checkLessonConnected(courseId, lessonId);

    return this.lessonService.updateArticle(lessonId, body.text);
  }

  async updateLesson(
    courseId: string,
    lessonId: string,
    body: IUpdateLessonDto,
  ): Promise<DbCourseLesson> {
    await this.checkLessonConnected(courseId, lessonId);

    return this.lessonService.update(lessonId, body);
  }

  async isEditable(id: string): Promise<boolean> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new InvalidEntityIdException('Course');
    }

    return course.enrolledCount === 0;
  }

  async publishById(courseId: string) {
    const course = await this.courseRepository.findById(courseId);
    if (course.status === CourseStatusEnum.PUBLISHED) {
      return;
    }

    await this.validateDraft(courseId);

    await this.publish(course);
  }

  private async validateDraft(courseId: string) {
    const course = await this.getById(courseId);

    if (course.modules.length === 0) {
      throw new EmptyCourseContentException('Course');
    }

    const hasEmptyLessons = course.modules.some((m) => m.lessons.length === 0);
    if (hasEmptyLessons) {
      throw new EmptyCourseContentException('Module');
    }

    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        await this.lessonService.validateLesson(lesson);
      }
    }
  }

  private async publish(course: DbCourse) {
    const { publishedVersionId } = course;
    if (publishedVersionId) {
      await this.courseRepository.updateById(publishedVersionId, {
        status: CourseStatusEnum.ARCHIVED,
      });
      await this.courseRepository.updateMany(
        {
          publishedVersionId,
          id: { notIn: [course.id] },
        },
        {
          publishedVersion: { connect: { id: course.id } },
        },
      );
    }
    await this.courseRepository.updateById(course.id, {
      status: CourseStatusEnum.PUBLISHED,
      publishedVersion: { disconnect: true },
    });
  }

  async enrollUser(userId: string, courseId: string) {
    const enrolled = await this.isUserEnrolled(userId, courseId);

    if (enrolled) {
      return;
    }

    await this.courseRepository.updateById(courseId, {
      enrollees: { create: { userId } },
      enrolledCount: { increment: 1 },
    });
  }

  async completeLesson(user: DbUser, courseId: string, lessonId: string) {
    await this.checkLessonConnected(courseId, lessonId);

    const completed = await this.lessonService.completeLesson(
      user.id,
      lessonId,
    );

    if (completed) {
      await this.courseRepository.updateById(courseId, {
        enrollees: {
          update: {
            where: { userId_courseId: { userId: user.id, courseId } },
            data: { lastProgressAt: new Date() },
          },
        },
      });
    }
  }

  private async checkTestConnected(courseId: string, testId: string) {
    const course = await this.courseRepository.findOne({
      modules: { some: { lessons: { some: { test: { id: testId } } } } },
    });

    if (!course) {
      throw new CourseTestDisconnectionException();
    }
  }

  async getTest(courseId: string, testId: string): Promise<DbLessonTest> {
    await this.checkTestConnected(courseId, testId);

    return this.testService.getById(testId);
  }

  @OnEvent(CourseEvent.LESSON_DURATION_UPDATED)
  private async handleLessonDurationChange({
    courseId,
    durationDelta,
  }: LessonDurationChangedEvent) {
    if (!durationDelta) {
      return;
    }

    const course = await this.courseRepository.findById(courseId);

    if (!course) {
      console.error(`Course with id ${courseId} was not found`);
      return;
    }

    await this.courseRepository.update(
      { id: course.id },
      { estimatedTime: { increment: durationDelta } },
    );
  }

  @OnEvent(CourseEvent.MODULE_DURATION_UPDATED)
  private async handleModuleDurationChange({
    courseId,
    durationDelta,
  }: ModuleDurationChangedEvent) {
    if (!durationDelta) {
      return;
    }

    const course = await this.courseRepository.findById(courseId);

    if (!course) {
      console.error(`Course with id ${courseId} was not found`);
      return;
    }

    await this.courseRepository.update(
      { id: course.id },
      { estimatedTime: { increment: durationDelta } },
    );
  }
}
