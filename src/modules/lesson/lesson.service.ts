import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateLessonDto } from '../../common/dtos/create-lesson.dto';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';
import { LessonTypeEnum } from '../../common/enums/lesson-type.enum';
import { TestLessonDto } from '../../common/dtos/test-lesson.dto';
import { LessonDto } from '../../common/dtos/lesson.dto';
import { ResourceTypeEnum } from '../../common/enums/resource-type.enum';
import { CourseLessonRepository } from '../../database/repositories/course-lesson.repository';
import { DbLessonResource } from '../../database/entities/lesson-resource.entity';
import {
  CreateResourceFunction,
  CreateResourceContext,
} from '../course/types/create-resource.types';
import { ArticleLessonDto } from '../../common/dtos/article-lesson.dto';
import { TestService } from '../test/test.service';
import { StorageService } from '../storage/storage.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CourseEvent } from '../../common/enums/course-event.enum';

@Injectable()
export class LessonService {
  private readonly storageResourceTypes = [
    ResourceTypeEnum.MARKDOWN,
    ResourceTypeEnum.VIDEO,
  ] as const as Partial<ResourceTypeEnum>[];

  private readonly createResourceMap: Partial<
    Record<LessonTypeEnum, CreateResourceFunction>
  >;

  constructor (
    private lessonRepository: CourseLessonRepository,
    private testService: TestService,
    private storageService: StorageService,
    private eventEmitter: EventEmitter2,
  ) {
    this.createResourceMap = {
      [LessonTypeEnum.ARTICLE]: this.createArticle.bind(this),
      [LessonTypeEnum.TEST]: testService.create.bind(testService),
    } as const;
  }

  async getCompletedBy (
    userId: string,
    courseId: string,
  ): Promise<DbCourseLesson[]> {
    return this.lessonRepository.findMany({
      module: { course: { id: courseId } },
      completedBy: { some: { user: { id: userId } } },
    });
  }

  async create (
    courseId: string,
    moduleId: string,
    { lesson }: CreateLessonDto,
  ): Promise<DbCourseLesson> {
    if (lesson.type === LessonTypeEnum.TEST) {
      this.testService.validateTest(lesson as TestLessonDto);
    }

    let dbLesson = await this.createGeneric(moduleId, lesson);

    const createResource = this.createResourceMap[lesson.type];
    if (createResource !== undefined) {
      dbLesson = await createResource(dbLesson, { courseId, lesson });
    }

    this.eventEmitter.emit(CourseEvent.LESSON_CREATED, dbLesson);

    return dbLesson;
  }

  async createGeneric (
    moduleId: string,
    lesson: LessonDto,
  ): Promise<DbCourseLesson> {
    const lessonCount = await this.lessonRepository.count({ moduleId });
    const order = lessonCount + 1;

    const links = lesson.links?.map(({ name, link }) => ({
      type: ResourceTypeEnum.LINK,
      name,
      link,
    }));

    const createLinks =
      links === undefined
        ? {}
        : {
          resources: {
            createMany: {
              data: links,
            },
          },
        };

    return this.lessonRepository.create(
      {
        name: lesson.name,
        type: lesson.type,
        estimatedTime: lesson.estimatedTime,
        order,
        module: {
          connect: { id: moduleId },
        },
        ...createLinks,
      },
      { resources: true },
    );
  }

  async signLessonResources (lesson: DbCourseLesson): Promise<DbCourseLesson> {
    if (!lesson.resources) {
      return lesson;
    }

    for (const resource of lesson.resources) {
      await this.signResourceUrl(resource);
    }

    return lesson;
  }

  private async signResourceUrl (
    resource: DbLessonResource,
  ): Promise<DbLessonResource> {
    if (this.storageResourceTypes.includes(resource.type)) {
      resource.link = await this.storageService.getSignedUrl(resource.link);
    }
    return resource;
  }

  private async signResourceUrls (
    resources: DbLessonResource[],
  ): Promise<DbLessonResource[]> {
    for (const resource of resources) {
      await this.signResourceUrl(resource);
    }
    return resources;
  }

  private async createArticle (
    dbLesson: DbCourseLesson,
    { courseId, lesson }: CreateResourceContext,
  ): Promise<DbCourseLesson> {
    const { article } = lesson as ArticleLessonDto;
    const { storagePath } = await this.storageService.uploadArticle(
      courseId,
      article,
    );

    const { resources } = await this.lessonRepository.update(
      { id: dbLesson.id },
      {
        resources: {
          create: {
            type: ResourceTypeEnum.MARKDOWN,
            link: storagePath,
          },
        },
      },
      { resources: true },
    );

    await this.signResourceUrls(resources);

    dbLesson.resources = resources;

    return dbLesson;
  }
}
