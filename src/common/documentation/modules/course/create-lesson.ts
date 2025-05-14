import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { CreateLessonDto } from '../../../dtos/create-lesson.dto';
import { getSchemaPath } from '@nestjs/swagger';
import { ArticleLessonTeacherResponse } from '../../../responses/article-lesson-teacher.response';
import { VideoLessonTeacherResponse } from '../../../responses/video-lesson-teacher.response';
import { TestLessonTeacherResponse } from '../../../responses/test-lesson-teacher.response';

export const CreateLessonDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the course owner can create lessons'],
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
    {
      name: 'moduleId',
      type: String,
      required: true,
    },
  ],
  body: {
    type: CreateLessonDto,
  },
  created: {
    schema: {
      oneOf: [
        { $ref: getSchemaPath(ArticleLessonTeacherResponse) },
        { $ref: getSchemaPath(VideoLessonTeacherResponse) },
        { $ref: getSchemaPath(TestLessonTeacherResponse) },
      ],
    },
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
