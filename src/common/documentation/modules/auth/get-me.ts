import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';

export const GetMeDocumentation: ApiDocumentationParams = {
  authRequired: true,
  badRequest: DefaultUnauthorizedResponse,
};