import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { UserResponse } from '../../../responses/user.response';

export const GetMeDocumentation: ApiDocumentationParams = {
  authRequired: true,
  ok: {
    type: UserResponse,
  },
  badRequest: DefaultUnauthorizedResponse,
};