import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { getSchemaPath } from '@nestjs/swagger';
import { ArticleLessonStudentResponse } from '../../../responses/article-lesson-student.response';
import { VideoLessonStudentResponse } from '../../../responses/video-lesson-student.response';
import { TestLessonStudentResponse } from '../../../responses/test-lesson-student.response';
import { ArticleLessonTeacherResponse } from '../../../responses/article-lesson-teacher.response';
import { VideoLessonTeacherResponse } from '../../../responses/video-lesson-teacher.response';
import { TestLessonTeacherResponse } from '../../../responses/test-lesson-teacher.response';

export const GetLessonDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: [
    'Only the owner and enrolled users can get lesson content',
  ],
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
    {
      name: 'lessonId',
      type: String,
      required: true,
    },
  ],
  ok: {
    schema: {
      oneOf: [
        { $ref: getSchemaPath(ArticleLessonStudentResponse) },
        { $ref: getSchemaPath(ArticleLessonTeacherResponse) },
        { $ref: getSchemaPath(VideoLessonStudentResponse) },
        { $ref: getSchemaPath(VideoLessonTeacherResponse) },
        { $ref: getSchemaPath(TestLessonStudentResponse) },
        { $ref: getSchemaPath(TestLessonTeacherResponse) },
      ],
    },
  },
  badRequest: {
    description: `
    InvalidEntityIdException:
      Course with such id was not found
      Lesson with such id was not found
    
    CourseLessonDisconnectionException:
      Course with such id has no lesson with such id`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};