import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { LessonResponse } from '../../../responses/lesson.response';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';

export const DeleteLessonDocumentation: ApiDocumentationParams = {
  authRequired: true,
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
    type: LessonResponse,
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