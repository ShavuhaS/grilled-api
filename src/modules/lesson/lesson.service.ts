import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from '../../common/dtos/create-lesson.dto';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';
import { LessonTypeEnum } from '../../common/enums/lesson-type.enum';
import { TestLessonDto } from '../../common/dtos/test-lesson.dto';
import { LessonDto } from '../../common/dtos/lesson.dto';
import { ResourceTypeEnum } from '../../common/enums/resource-type.enum';
import { CourseLessonRepository } from '../../database/repositories/course-lesson.repository';
import { DbLessonResource } from '../../database/entities/lesson-resource.entity';
import {
  CreateResourceContext,
  CreateResourceFunction,
} from '../course/types/create-resource.types';
import { ArticleLessonDto } from '../../common/dtos/article-lesson.dto';
import { TestService } from '../test/test.service';
import { StorageService } from '../storage/storage.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CourseEvent } from '../../common/enums/course-event.enum';
import { InvalidEntityTypeException } from '../../common/exceptions/invalid-entity-type.exception';
import { MediaService } from '../media/media.service';
import { seconds } from '../../common/utils/time.constants';
import { DurationUpdatedEvent } from '../../common/events/duration-updated.event';
import { ResourceDeletedEvent } from '../../common/events/resource-deleted.event';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { LessonUserContext } from '../course/types/lesson-user-context.type';
import { TestResults } from '../test/types/test-results.type';
import { IUpdateLessonDto } from '../../common/dtos/update-lesson.dto';
import { nonEmptyObject } from '../../common/utils/object.utils';

const storageResourceTypes = [
  ResourceTypeEnum.MARKDOWN,
  ResourceTypeEnum.VIDEO,
] as const as Partial<ResourceTypeEnum>[];

@Injectable()
export class LessonService {
  private readonly createResourceMap: Partial<
    Record<LessonTypeEnum, CreateResourceFunction>
  >;
  private readonly lessonToResourceMap: Partial<
    Record<LessonTypeEnum, ResourceTypeEnum>
  > = {
    [LessonTypeEnum.VIDEO]: ResourceTypeEnum.VIDEO,
    [LessonTypeEnum.ARTICLE]: ResourceTypeEnum.MARKDOWN,
  };

  constructor(
    private lessonRepository: CourseLessonRepository,
    private testService: TestService,
    private storageService: StorageService,
    private mediaService: MediaService,
    private eventEmitter: EventEmitter2,
  ) {
    this.createResourceMap = {
      [LessonTypeEnum.ARTICLE]: this.createArticle.bind(this),
      [LessonTypeEnum.TEST]: testService.create.bind(testService),
    } as const;
  }

  async getById(id: string, signResources = false): Promise<DbCourseLesson> {
    const lesson = await this.lessonRepository.findById(id, {
      resources: true,
      test: {
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      },
    });

    if (signResources) {
      await this.signLessonResources(lesson);
    }

    return lesson;
  }

  async getUserContext(
    userId: string,
    lessonId: string,
  ): Promise<LessonUserContext> {
    const lesson = await this.lessonRepository.findById(lessonId, {
      test: true,
    });

    if (!lesson) {
      throw new InvalidEntityIdException('Lesson');
    }

    const completedLesson = await this.lessonRepository.findOne({
      id: lessonId,
      completedBy: { some: { userId } },
    });

    const completed = !!completedLesson;

    let testResults: TestResults;
    if (lesson?.type === LessonTypeEnum.TEST) {
      testResults = await this.testService.getUserResults(
        lesson.test.id,
        userId,
      );
    }

    return { isStudent: true, completed, testResults };
  }

  async getCompletedBy(
    userId: string,
    courseId: string,
  ): Promise<DbCourseLesson[]> {
    return this.lessonRepository.findMany({
      module: { course: { id: courseId } },
      completedBy: { some: { user: { id: userId } } },
    });
  }

  async create(
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

    this.eventEmitter.emit(
      CourseEvent.DURATION_UPDATED,
      new DurationUpdatedEvent(
        dbLesson.id,
        moduleId,
        courseId,
        dbLesson.estimatedTime,
      ),
    );

    return dbLesson;
  }

  async createGeneric(
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

  private async createArticle(
    dbLesson: DbCourseLesson,
    { lesson }: CreateResourceContext,
  ): Promise<DbCourseLesson> {
    const { article } = lesson as ArticleLessonDto;
    const { storagePath } = await this.storageService.uploadArticle(article);

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

  async delete(id: string): Promise<DbCourseLesson> {
    const lesson = await this.lessonRepository.findById(id, {
      resources: true,
      module: true,
    });

    if (!lesson) {
      throw new InvalidEntityIdException('Lesson');
    }

    await this.lessonRepository.delete({ id });

    await this.lessonRepository.updateMany(
      {
        moduleId: lesson.moduleId,
        order: { gt: lesson.order },
      },
      { order: { decrement: 1 } },
    );

    for (const { link, type } of lesson.resources) {
      this.eventEmitter.emit(
        CourseEvent.RESOURCE_DELETED,
        new ResourceDeletedEvent(link, type),
      );
    }

    this.eventEmitter.emit(
      CourseEvent.DURATION_UPDATED,
      new DurationUpdatedEvent(
        id,
        lesson.moduleId,
        lesson.module.courseId,
        -lesson.estimatedTime,
      ),
    );

    return lesson;
  }

  async uploadVideo(
    lessonId: string,
    file: Express.Multer.File,
  ): Promise<DbCourseLesson> {
    const lesson = await this.lessonRepository.findById(lessonId, {
      resources: true,
    });

    if (lesson.type !== LessonTypeEnum.VIDEO) {
      throw new InvalidEntityTypeException('Lesson');
    }

    const { storagePath } = await this.storageService.uploadVideo(file);
    await this.updateStorageResource(
      lesson,
      ResourceTypeEnum.VIDEO,
      storagePath,
    );

    const durationInSeconds = await this.mediaService.getVideoDuration(file);
    const duration = Math.ceil(durationInSeconds / seconds.MINUTE);

    const updatedLesson = await this.lessonRepository.updateById(
      lessonId,
      { estimatedTime: duration },
      { resources: true, module: true },
    );

    this.eventEmitter.emit(
      CourseEvent.DURATION_UPDATED,
      new DurationUpdatedEvent(
        lessonId,
        updatedLesson.moduleId,
        updatedLesson.module.courseId,
        updatedLesson.estimatedTime - (lesson.estimatedTime ?? 0),
      ),
    );

    return this.signLessonResources(updatedLesson);
  }

  async updateArticle(lessonId: string, text: string): Promise<DbCourseLesson> {
    const lesson = await this.lessonRepository.findById(lessonId, {
      resources: true,
    });

    if (lesson.type !== LessonTypeEnum.ARTICLE) {
      throw new InvalidEntityTypeException('Lesson');
    }

    const { storagePath } = await this.storageService.uploadArticle(text);
    await this.updateStorageResource(
      lesson,
      ResourceTypeEnum.MARKDOWN,
      storagePath,
    );

    const updatedLesson = await this.lessonRepository.findById(lessonId, {
      resources: true,
    });
    return this.signLessonResources(updatedLesson);
  }

  async update(id: string, dto: IUpdateLessonDto): Promise<DbCourseLesson> {
    dto = nonEmptyObject(dto);
    if (!dto) {
      return this.getById(id, true);
    }

    const lesson = await this.lessonRepository.findById(id, {
      resources: true,
      module: true,
    });

    if (!lesson) {
      throw new InvalidEntityIdException('Lesson');
    }

    if (dto.type && lesson.type !== dto.type) {
      if (dto.type === LessonTypeEnum.VIDEO) {
        dto.estimatedTime = null;
      }

      if (lesson.type in this.lessonToResourceMap) {
        await this.deleteResources(
          lesson,
          this.lessonToResourceMap[lesson.type],
        );
      }

      if (dto.type === LessonTypeEnum.TEST) {
        await this.testService.createEmpty(lesson.id);
      }
    }

    if (dto.order) {
      await this.updateOrder(lesson, dto.order);
      delete dto.order;
    }

    await this.lessonRepository.updateById(id, { ...dto });

    if (dto.estimatedTime !== undefined) {
      const durationDelta = dto.estimatedTime - lesson.estimatedTime;
      if (durationDelta !== 0) {
        this.eventEmitter.emit(
          CourseEvent.DURATION_UPDATED,
          new DurationUpdatedEvent(
            id,
            lesson.moduleId,
            lesson.module.courseId,
            durationDelta,
          ),
        );
      }
    }

    return this.getById(id, true);
  }

  private async updateOrder(
    { id, moduleId, order }: DbCourseLesson,
    newOrder: number,
  ) {
    if (order === newOrder) return;

    const lessonCount = await this.lessonRepository.count({ moduleId });
    newOrder = Math.min(newOrder, lessonCount);
    newOrder = Math.max(newOrder, 1);

    let orderFilter, increment;
    if (newOrder > order) {
      orderFilter = { gt: order, lte: newOrder };
      increment = -1;
    } else {
      orderFilter = { gte: newOrder, lt: order };
      increment = 1;
    }

    await this.lessonRepository.updateMany(
      { moduleId, order: orderFilter },
      { order: { increment } },
    );

    await this.lessonRepository.updateById(id, { order: newOrder });
  }

  private async deleteResources(
    { id, resources }: DbCourseLesson,
    type: ResourceTypeEnum,
  ) {
    const typeResources = resources?.filter((res) => res.type === type);
    const resourceIds = typeResources?.map(({ id }) => id) ?? [];

    await this.lessonRepository.updateById(id, {
      resources: {
        deleteMany: {
          id: { in: resourceIds },
        },
      },
    });

    for (const { link, type } of typeResources) {
      this.eventEmitter.emit(
        CourseEvent.RESOURCE_DELETED,
        new ResourceDeletedEvent(link, type),
      );
    }
  }

  private async updateStorageResource(
    { id, resources }: DbCourseLesson,
    type: ResourceTypeEnum,
    storagePath: string,
  ) {
    const oldResource = resources?.find((res) => res.type === type);

    const resourceAction =
      oldResource === undefined
        ? {
            create: {
              type,
              link: storagePath,
            },
          }
        : {
            update: {
              where: {
                id: oldResource.id,
              },
              data: {
                link: storagePath,
              },
            },
          };

    await this.lessonRepository.updateById(id, { resources: resourceAction });

    if (oldResource) {
      this.eventEmitter.emit(
        CourseEvent.RESOURCE_DELETED,
        new ResourceDeletedEvent(oldResource.link, oldResource.type),
      );
    }
  }

  async signLessonResources(lesson: DbCourseLesson): Promise<DbCourseLesson> {
    if (!lesson.resources) {
      return lesson;
    }

    for (const resource of lesson.resources) {
      await this.signResourceUrl(resource);
    }

    return lesson;
  }

  private async signResourceUrl(
    resource: DbLessonResource,
  ): Promise<DbLessonResource> {
    if (storageResourceTypes.includes(resource.type)) {
      resource.link = await this.storageService.getSignedUrl(resource.link);
    }
    return resource;
  }

  private async signResourceUrls(
    resources: DbLessonResource[],
  ): Promise<DbLessonResource[]> {
    for (const resource of resources) {
      await this.signResourceUrl(resource);
    }
    return resources;
  }

  @OnEvent(CourseEvent.RESOURCE_DELETED)
  async handleResourceDelete({
    storagePath,
    resourceType,
  }: ResourceDeletedEvent) {
    if (!storageResourceTypes.includes(resourceType)) {
      return;
    }

    const otherLesson = await this.lessonRepository.findOne({
      resources: { some: { type: resourceType, link: storagePath } },
    });

    if (!otherLesson) {
      await this.storageService.deleteFile(storagePath);
    }
  }
}
