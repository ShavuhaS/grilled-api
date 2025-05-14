import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';

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
  badRequest: DefaultUnauthorizedResponse,
};
