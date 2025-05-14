import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { TokensResponse } from '../../../responses/tokens.response';
import { LoginDto } from '../../../dtos/login.dto';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';

export const LoginDocumentation: ApiDocumentationParams = {
  authRequired: false,
  body: {
    type: LoginDto,
  },
  created: {
    type: TokensResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Email should not be empty
      Email should be a string
      Email should be a valid email
      Password should not be empty
      Password should be a string
      
    InvalidEntityIdException:
      User with such id was not found
    
    EmailNotConfirmedException:
      Email has not been confirmed
    ${DefaultUnauthorizedResponse.description}`,
  },
};
