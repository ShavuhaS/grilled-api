import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';

export const EnrollDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['User must be a student', 'Course must be published'],
  params: [
    {
      type: String,
      required: true,
      name: 'courseId',
    },
  ],
  created: {},
  badRequest: {
    description: `
    InvalidEntityIdException:
      Course with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
