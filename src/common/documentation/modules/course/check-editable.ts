import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { CheckEditableResponse } from '../../../responses/check-editable.response';

export const CheckEditableDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the owner of the course can check its status'],
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
  ],
  badRequest: {
    description: `
    InvalidEntityIdException:
      Course with such id was not found`,
  },
  ok: {
    type: CheckEditableResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
