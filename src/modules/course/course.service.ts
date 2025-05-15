import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../database/repositories/course.repository';
import { CreateCourseDto } from '../../common/dtos/create-course.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { DbUser } from '../../database/entities/user.entity';
import { CreateCourseModuleDto } from '../../common/dtos/create-course-module.dto';
import { DbCourseModule } from '../../database/entities/course-module.entity';
import { CourseModuleRepository } from '../../database/repositories/course-module.repository';
import { CourseModuleDisconnectionException } from '../../common/exceptions/course-module-disconnection.exception';
import { CreateLessonDto } from '../../common/dtos/create-lesson.dto';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';
import { LessonTypeEnum } from '../../common/enums/lesson-type.enum';
import { ArticleLessonDto } from '../../common/dtos/article-lesson.dto';
import { TestLessonDto } from '../../common/dtos/test-lesson.dto';
import { LessonDto } from '../../common/dtos/lesson.dto';
import {
  CreateResourceFunction,
  CreateResourceOptions,
} from './types/create-resource.types';
import { CourseLessonRepository } from '../../database/repositories/course-lesson.repository';
import { QuestionTypeEnum } from '../../common/enums/question-type.enum';
import { InvalidEntityIndexException } from '../../common/exceptions/invalid-entity-index.exception';
import {
  ChoiceTestQuestionDto,
  MultiChoiceTestQuestionDto, ShortTestQuestionDto, TestQuestionDto,
} from '../../common/dtos/test-question.dto';
import { ValidateQuestionFunction } from './types/validate-question.type';
import { ResourceTypeEnum } from '../../common/enums/resource-type.enum';
import { StorageService } from '../storage/storage.service';
import { CourseTestRepository } from '../../database/repositories/course-test.repository';
import { DbTestQuestion } from '../../database/entities/test-question.entity';
import { CreateTestQuestionFunction } from './types/create-question.types';
import { TestQuestionRepository } from '../../database/repositories/test-question.repository';
import { CourseMappingOptions } from './interfaces/mapping-options.interfaces';
import { CourseProgress, ModuleProgress } from './interfaces/course-progress.interface';
import { DbLessonResource } from '../../database/entities/lesson-resource.entity';

@Injectable()
export class CourseService {
  private readonly storageResources = [
    ResourceTypeEnum.MARKDOWN,
    ResourceTypeEnum.VIDEO,
  ] as const as Partial<ResourceTypeEnum>[];

  private readonly createResourceMap: Partial<
    Record<LessonTypeEnum, CreateResourceFunction>
  > = {
    [LessonTypeEnum.ARTICLE]: this.createArticle.bind(this),
    [LessonTypeEnum.TEST]: this.createTest.bind(this),
  } as const;

  private readonly questionValidMap: Partial<
    Record<QuestionTypeEnum, ValidateQuestionFunction>
  > = {
    [QuestionTypeEnum.CHOICE]: this.isChoiceQuestionValid.bind(this),
    [QuestionTypeEnum.MULTICHOICE]: this.isMultiChoiceQuestionValid.bind(this),
  } as const;

  private readonly createTestQuestionMap: Partial<
    Record<QuestionTypeEnum, CreateTestQuestionFunction>
  > = {
    [QuestionTypeEnum.CHOICE]: this.createChoiceQuestion.bind(this),
    [QuestionTypeEnum.MULTICHOICE]: this.createMultiChoiceQuestion.bind(this),
    [QuestionTypeEnum.SHORT_ANSWER]: this.createShortAnswerQuestion.bind(this),
  } as const;

  constructor (
    private courseRepository: CourseRepository,
    private courseModuleRepository: CourseModuleRepository,
    private courseLessonRepository: CourseLessonRepository,
    private courseTestRepository: CourseTestRepository,
    private testQuestionRepository: TestQuestionRepository,
    private storageService: StorageService,
  ) {}

  async getById (id: string): Promise<DbCourse> {
    return this.courseRepository.findById(id, {
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
  }

  async create (user: DbUser, body: CreateCourseDto): Promise<DbCourse> {
    return this.courseRepository.create({
      ...body,
      authorId: user.id,
    });
  }

  async isUserEnrolled (user: DbUser, course: DbCourse): Promise<boolean> {
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

  async ownsCourse (user: DbUser, course: DbCourse): Promise<boolean> {
    return course.authorId === user.id;
  }

  async createModule (
    courseId: string,
    body: CreateCourseModuleDto,
  ): Promise<DbCourseModule> {
    const modules = await this.courseModuleRepository.findMany({
      where: { courseId },
      orderBy: {
        order: 'desc',
      },
    });

    let order = 1;
    if (modules.length > 0) order = modules[0].order + 1;

    return await this.courseModuleRepository.create(
      {
        ...body,
        order,
        course: {
          connect: { id: courseId },
        },
      },
      {
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    );
  }

  private async checkModuleConnected (
    courseId: string,
    moduleId: string,
  ): Promise<DbCourseModule> {
    const courseModule = await this.courseModuleRepository.findById(moduleId);

    if (courseModule.courseId !== courseId) {
      throw new CourseModuleDisconnectionException();
    }

    return courseModule;
  }

  async deleteModule (courseId: string, moduleId: string) {
    const { order } = await this.checkModuleConnected(courseId, moduleId);

    await this.courseModuleRepository.delete({ id: moduleId });

    await this.courseModuleRepository.updateMany(
      {
        courseId,
        order: {
          gt: order,
        },
      },
      {
        order: {
          decrement: 1,
        },
      },
    );
  }

  async getUserProgress (user: DbUser, course: DbCourse): Promise<CourseProgress> {
    const completedLessons = await this.courseLessonRepository.findMany({
      module: { course: { id: course.id } },
      completedBy: { some: { user: { id: user.id } } },
    });

    const completedSet = new Set(completedLessons.map(({ id }) => id));

    const modules: ModuleProgress[] = [];
    let completedCourse = 0;
    let totalCourse = 0;
    for (const module of course.modules) {
      const completed: boolean[] = module.lessons.map(
        ({ id }) => completedSet.has(id)
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

  async personalizeCourseResponse (user: DbUser, course: DbCourse): Promise<CourseMappingOptions> {
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

  async createLesson (
    courseId: string,
    moduleId: string,
    { lesson }: CreateLessonDto,
  ): Promise<DbCourseLesson> {
    await this.checkModuleConnected(courseId, moduleId);

    if (lesson.type === LessonTypeEnum.TEST) {
      this.validateTest(lesson as TestLessonDto);
    }

    const dbLesson = await this.createGenericLesson(moduleId, lesson);

    const createResource = this.createResourceMap[lesson.type];
    if (createResource !== undefined) {
      return createResource(dbLesson, { courseId, lesson });
    }

    return dbLesson;
  }

  async createGenericLesson (
    moduleId: string,
    lesson: LessonDto,
  ): Promise<DbCourseLesson> {
    const lessonCount = await this.courseLessonRepository.count({ moduleId });
    const order = lessonCount + 1;

    const links = lesson.links?.map(({ name, link }) => ({
      type: ResourceTypeEnum.LINK,
      name,
      link,
    }));

    const createLinks = (links === undefined) ? {} : {
      resources: {
        createMany: {
          data: links,
        },
      },
    };

    const created = await this.courseLessonRepository.create(
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

    if (lesson.estimatedTime) {
      await this.updateEstimatedTime(created.id, created.estimatedTime);
    }

    return created;
  }

  private async updateEstimatedTime (lessonId: string, delta: number) {
    const lesson = await this.courseLessonRepository.find(
      { id: lessonId },
      {
        module: {
          include: {
            course: true,
          },
        },
      },
    );

    const moduleId = lesson.moduleId;
    await this.courseModuleRepository.update(
      { id: moduleId },
      { estimatedTime: { increment: delta } },
    );

    const courseId = lesson.module.courseId;
    await this.courseRepository.update(
      { id: courseId },
      { estimatedTime: { increment: delta } },
    );
  }

  private async signResourceUrls (resources: DbLessonResource[]): Promise<DbLessonResource[]> {
    for (const resource of resources) {
      if (this.storageResources.includes(resource.type)) {
        resource.link = await this.storageService.getSignedUrl(resource.link);
      }
    }
    return resources;
  }

  private async createArticle (
    dbLesson: DbCourseLesson,
    { courseId, lesson }: CreateResourceOptions,
  ): Promise<DbCourseLesson> {
    const { article } = lesson as ArticleLessonDto;
    const { storagePath } = await this.storageService.uploadArticle(
      courseId,
      article,
    );

    const { resources } = await this.courseLessonRepository.update(
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

  private async createTest (
    dbLesson: DbCourseLesson,
    { lesson }: CreateResourceOptions,
  ): Promise<DbCourseLesson> {
    const { questions } = lesson as TestLessonDto;

    const test = await this.courseTestRepository.create({
      lesson: { connect: { id: dbLesson.id } },
      questionCount: questions.length,
    });

    const dbQuestions: DbTestQuestion[] = [];
    for (const question of questions) {
      const createQuestion = this.createTestQuestionMap[question.type];
      if (createQuestion !== undefined) {
        const dbQuestion = await createQuestion(test.id, question);
        dbQuestions.push(dbQuestion);
      }
    }

    test.questions = dbQuestions;
    dbLesson.test = test;

    return dbLesson;
  }

  private async createBaseQuestion (
    testId: string,
    { text, type }: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    return this.testQuestionRepository.create({
      test: { connect: { id: testId } },
      type,
      text,
    });
  }

  private async createChoiceQuestion (
    testId: string,
    question: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    const { answers, rightAnswer } = question as ChoiceTestQuestionDto;

    const dbQuestion = await this.createBaseQuestion(testId, question);

    return this.testQuestionRepository.update(
      { id: dbQuestion.id },
      {
        answers: {
          createMany: {
            data: answers.map(({ text, commentary }, ind) => ({
              text,
              commentary,
              correct: ind === rightAnswer,
            })),
          },
        },
      },
      { answers: true },
    );
  }

  private async createMultiChoiceQuestion (
    testId: string,
    question: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    const { answers, rightAnswers } = question as MultiChoiceTestQuestionDto;

    const dbQuestion = await this.createBaseQuestion(testId, question);

    return this.testQuestionRepository.update(
      { id: dbQuestion.id },
      {
        answers: {
          createMany: {
            data: answers.map(({ text, commentary }, ind) => ({
              text,
              commentary,
              correct: rightAnswers.includes(ind),
            })),
          },
        },
      },
      { answers: true },
    );
  }

  private async createShortAnswerQuestion (
    testId: string,
    question: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    const { rightAnswer } = question as ShortTestQuestionDto;

    const dbQuestion = await this.createBaseQuestion(testId, question);

    return this.testQuestionRepository.update(
      { id: dbQuestion.id },
      {
        answers: {
          create: {
            text: rightAnswer.text,
            commentary: rightAnswer.commentary,
            correct: true,
          },
        },
      },
      { answers: true },
    );
  }

  private validateTest ({ questions }: TestLessonDto) {
    for (const question of questions) {
      const isValid = this.questionValidMap[question.type];
      if (isValid !== undefined && !isValid(question)) {
        throw new InvalidEntityIndexException('Question answer');
      }
    }
  }

  private isChoiceQuestionValid ({
    answers,
    rightAnswer,
  }: ChoiceTestQuestionDto): boolean {
    return 0 <= rightAnswer && rightAnswer < answers.length;
  }

  private isMultiChoiceQuestionValid ({
    answers,
    rightAnswers,
  }: MultiChoiceTestQuestionDto): boolean {
    return rightAnswers.every((ans) => 0 <= ans && ans < answers.length);
  }
}