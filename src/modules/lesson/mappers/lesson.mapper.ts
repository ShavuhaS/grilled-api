import { Injectable } from '@nestjs/common';
import { DbCourseLesson } from '../../../database/entities/course-lesson.entity';
import { BaseLessonResponse } from '../../../common/responses/base-lesson.response';
import { LessonResponse } from '../../../common/responses/lesson.response';
import { ResourceTypeEnum } from '../../../common/enums/resource-type.enum';
import { LessonResourceMapper } from './lesson-resource.mapper';
import { LessonMappingOptions } from '../interfaces/lesson-mapping-options.interface';
import { LessonTeacherResponse } from '../../../common/responses/lesson-teacher.response';
import { LessonTypeEnum } from '../../../common/enums/lesson-type.enum';
import { VideoLessonTeacherResponse } from '../../../common/responses/video-lesson-teacher.response';
import { ArticleLessonTeacherResponse } from '../../../common/responses/article-lesson-teacher.response';
import { TestLessonTeacherResponse } from '../../../common/responses/test-lesson-teacher.response';
import { TestMapper } from '../../test/mappers/test.mapper';
import { LessonStudentResponse } from '../../../common/responses/lesson-student.response';
import { LessonUserContext } from '../../course/types/lesson-user-context.type';
import { ArticleLessonStudentResponse } from '../../../common/responses/article-lesson-student.response';
import { VideoLessonStudentResponse } from '../../../common/responses/video-lesson-student.response';
import { TestLessonStudentResponse } from '../../../common/responses/test-lesson-student.response';
import { TestResults } from '../../test/types/test-results.type';

@Injectable()
export class LessonMapper {
  constructor (
    private resourceMapper: LessonResourceMapper,
    private testMapper: TestMapper,
  ) {}

  toBaseLessonResponse (lesson: DbCourseLesson): BaseLessonResponse {
    return {
      id: lesson.id,
      name: lesson.name,
      type: lesson.type,
      estimatedTime: lesson.estimatedTime,
      number: lesson.order,
    };
  }

  toLessonResponse (
    lesson: DbCourseLesson,
    options: LessonMappingOptions,
  ): LessonResponse {
    const linkResources =
      lesson.resources?.filter(({ type }) => type === ResourceTypeEnum.LINK) ??
      [];

    const links = options.links
      ? linkResources.map((link) => this.resourceMapper.toLinkResponse(link))
      : undefined;

    return {
      ...this.toBaseLessonResponse(lesson),
      completed: options.completed,
      links,
    };
  }

  toLessonTeacherResponse (lesson: DbCourseLesson): LessonTeacherResponse {
    switch (lesson.type) {
      case LessonTypeEnum.ARTICLE:
        return this.toArticleLessonTeacherResponse(lesson);
      case LessonTypeEnum.VIDEO:
        return this.toVideoLessonTeacherResponse(lesson);
      case LessonTypeEnum.TEST:
        return this.toTestLessonTeacherResponse(lesson);
      default:
        return null;
    }
  }

  toArticleLessonTeacherResponse (
    lesson: DbCourseLesson,
  ): ArticleLessonTeacherResponse {
    const article = lesson.resources?.find(
      ({ type }) => type === ResourceTypeEnum.MARKDOWN,
    );

    return {
      ...this.toLessonResponse(lesson, { links: true }),
      articleLink: article?.link ?? null,
    } as ArticleLessonTeacherResponse;
  }

  toVideoLessonTeacherResponse (
    lesson: DbCourseLesson,
  ): VideoLessonTeacherResponse {
    const video = lesson.resources?.find(
      ({ type }) => type === ResourceTypeEnum.VIDEO,
    );

    return {
      ...this.toLessonResponse(lesson, { links: true }),
      videoLink: video?.link ?? null,
    } as VideoLessonTeacherResponse;
  }

  toTestLessonTeacherResponse (
    lesson: DbCourseLesson,
  ): TestLessonTeacherResponse {
    return {
      ...this.toLessonResponse(lesson, { links: true }),
      test: lesson.test && this.testMapper.toTestTeacherResponse(lesson.test),
    } as TestLessonTeacherResponse;
  }

  toLessonStudentResponse (
    lesson: DbCourseLesson,
    context: LessonUserContext,
  ): LessonStudentResponse {
    if (!context.isStudent) return null;

    switch (lesson.type) {
      case LessonTypeEnum.ARTICLE:
        return this.toArticleLessonStudentResponse(lesson, context.completed);
      case LessonTypeEnum.VIDEO:
        return this.toVideoLessonStudentResponse(lesson, context.completed);
      case LessonTypeEnum.TEST:
        return this.toTestLessonStudentResponse(lesson, context.completed, context.testResults);
      default:
        return null;
    }
  }

  toArticleLessonStudentResponse (
    lesson: DbCourseLesson,
    completed: boolean,
  ): ArticleLessonStudentResponse {
    const article = lesson.resources?.find(
      ({ type }) => type === ResourceTypeEnum.MARKDOWN,
    );

    return {
      ...this.toLessonResponse(lesson, { links: true, completed }),
      articleLink: article?.link ?? null,
    } as ArticleLessonStudentResponse;
  }

  toVideoLessonStudentResponse (
    lesson: DbCourseLesson,
    completed: boolean,
  ): VideoLessonStudentResponse {
    const video = lesson.resources?.find(
      ({ type }) => type === ResourceTypeEnum.VIDEO,
    );

    return {
      ...this.toLessonResponse(lesson, { links: true, completed }),
      videoLink: video?.link ?? null,
    } as VideoLessonStudentResponse;
  }

  toTestLessonStudentResponse (
    lesson: DbCourseLesson,
    completed: boolean,
    testResults: TestResults,
  ): TestLessonStudentResponse {
    return {
      ...this.toLessonResponse(lesson, { links: true, completed }),
      testResults,
    } as TestLessonStudentResponse;
  }
}
