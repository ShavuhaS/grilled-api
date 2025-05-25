import { Injectable } from '@nestjs/common';
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
import { DurationUpdatedEvent } from '../../common/events/duration-updated.event';
import { LessonUserContext } from './types/lesson-user-context.type';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { UpdateArticleDto } from '../../common/dtos/update-article.dto';
import { IUpdateLessonDto } from '../../common/dtos/update-lesson.dto';

@Injectable()
export class CourseService {
  constructor(
    private courseRepository: CourseRepository,
    private moduleService: CourseModuleService,
    private lessonService: LessonService,
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
    }

    return course;
  }

  private async signCourseResources(course: DbCourse): Promise<DbCourse> {
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

  async isUserEnrolled(user: DbUser, course: DbCourse): Promise<boolean> {
    const enrollee = await this.courseRepository.findOne({
      id: course.id,
      enrollees: {
        some: {
          userId: user.id,
        },
      },
    });

    return !!enrollee;
  }

  private async ownsCourse(user: DbUser, course: DbCourse): Promise<boolean> {
    return course.authorId === user.id;
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

    const isOwner = await this.ownsCourse(user, course);
    if (isOwner) {
      return { links: true };
    }

    const isEnrolled = await this.isUserEnrolled(user, course);
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

  async uploadVideo(
    courseId: string,
    lessonId: string,
    file: Express.Multer.File,
  ): Promise<DbCourseLesson> {
    await this.checkLessonConnected(courseId, lessonId);

    return await this.lessonService.uploadVideo(lessonId, file);
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

  @OnEvent(CourseEvent.DURATION_UPDATED)
  private async updateEstimatedTime({
    courseId,
    durationDelta,
  }: DurationUpdatedEvent) {
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
