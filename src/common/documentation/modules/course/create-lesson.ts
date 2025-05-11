import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { CreateLessonDto } from '../../../dtos/create-lesson.dto';

export const CreateLessonDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: [
    'Only the course owner can create lessons',
  ],
  body: {
    type: CreateLessonDto,
  },
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
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};