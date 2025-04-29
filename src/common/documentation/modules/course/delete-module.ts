import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';

export const DeleteModuleDocumentatiton: ApiDocumentationParams = {
  authRequired: true,
  policies: [
    'Teacher should own the module\'s course',
  ],
  params: [
    {
      name: 'moduleId',
      type: String,
      required: true,
    },
  ],
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Module with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};