import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { AccessTokenResponse } from '../../../responses/access-token.response';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';

export const RefreshDocumentation: ApiDocumentationParams = {
  authRequired: true,
  ok: {
    type: AccessTokenResponse,
  },
  badRequest: DefaultUnauthorizedResponse,
};