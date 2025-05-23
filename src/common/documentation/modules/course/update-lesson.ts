import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { UpdateLessonDto } from '../../../dtos/update-lesson.dto';
import { getSchemaPath } from '@nestjs/swagger';
import { ArticleLessonTeacherResponse } from '../../../responses/article-lesson-teacher.response';
import { VideoLessonTeacherResponse } from '../../../responses/video-lesson-teacher.response';
import { TestLessonTeacherResponse } from '../../../responses/test-lesson-teacher.response';

export const UpdateLessonDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: [
    'Only the course owner can update the lesson',
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
  body: {
    type: UpdateLessonDto,
  },
  ok: {
    schema: {
      oneOf: [
        { $ref: getSchemaPath(ArticleLessonTeacherResponse) },
        { $ref: getSchemaPath(VideoLessonTeacherResponse) },
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
      Course with such id has no lesson with such id
      
    InvalidBodyException:
      Order must be a number
      Order must be positive
      Name must be a string
      Name must be at least 5 characters long
      Name must be at most 50 characters long
      Type must be ARTICLE, VIDEO or TEST
      Estimated time must be an integer
      Estimated time must be positive
      Estimated time can not be longer than 3 hours`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};