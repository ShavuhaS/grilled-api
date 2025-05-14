import { Injectable } from '@nestjs/common';
import { DbCourseLesson } from '../../../database/entities/course-lesson.entity';
import { BaseLessonResponse } from '../../../common/responses/base-lesson.response';
import { LessonResponse } from '../../../common/responses/lesson.response';
import { ResourceTypeEnum } from '../../../common/enums/resource-type.enum';
import { LessonResourceMapper } from './lesson-resource.mapper';
import { LessonMappingOptions } from '../interfaces/mapping-options.interfaces';
import { LessonTeacherResponse } from '../../../common/responses/lesson-teacher.response';
import { LessonTypeEnum } from '../../../common/enums/lesson-type.enum';
import { VideoLessonTeacherResponse } from '../../../common/responses/video-lesson-teacher.response';
import { ArticleLessonTeacherResponse } from '../../../common/responses/article-lesson-teacher.response';
import { TestLessonTeacherResponse } from '../../../common/responses/test-lesson-teacher.response';
import { LessonTestMapper } from './lesson-test.mapper.';

@Injectable()
export class CourseLessonMapper {
  constructor (
    private resourceMapper: LessonResourceMapper,
    private testMapper: LessonTestMapper,
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

  toLessonResponse (lesson: DbCourseLesson, options: LessonMappingOptions): LessonResponse {
    const linkResources = lesson.resources?.filter(
      ({ type }) => type === ResourceTypeEnum.LINK
    ) ?? [];

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

  toArticleLessonTeacherResponse (lesson: DbCourseLesson): ArticleLessonTeacherResponse {
    const article = lesson.resources?.find(
      ({ type }) => type === ResourceTypeEnum.MARKDOWN
    );

    return {
      ...this.toLessonResponse(lesson, { links: true }),
      articleLink: article?.link,
    } as ArticleLessonTeacherResponse;
  }

  toVideoLessonTeacherResponse (lesson: DbCourseLesson): VideoLessonTeacherResponse {
    const video = lesson.resources?.find(
      ({ type }) => type === ResourceTypeEnum.VIDEO
    );

    return {
      ...this.toLessonResponse(lesson, { links: true }),
      videoLink: video?.link,
    } as VideoLessonTeacherResponse;
  }

  toTestLessonTeacherResponse (lesson: DbCourseLesson): TestLessonTeacherResponse {
    return {
      ...this.toLessonResponse(lesson, { links: true }),
      test: this.testMapper.toTestTeacherResponse(lesson.test),
    } as TestLessonTeacherResponse;
  }
}
