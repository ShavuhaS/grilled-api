import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { TokensResponse } from '../../../responses/tokens.response';

export const VerifyEmailDocumentation: ApiDocumentationParams = {
  authRequired: false,
  created: {
    type: TokensResponse,
  },
  badRequest: {
    description: `\n
    InvalidTokenException:
      Invalid token
      
    TokenExpiredException:
      Token has expired`,
  },
  params: [
    {
      name: 'token',
      description: 'Email verification token',
      type: String,
      required: true,
    },
  ],
};
