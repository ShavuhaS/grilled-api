import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';

export const LogoutDocumentation: ApiDocumentationParams = {
  authRequired: true,
  unauthorized: DefaultUnauthorizedResponse,
  created: {},
};