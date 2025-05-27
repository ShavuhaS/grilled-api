import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { UpdateUserDto } from '../../../dtos/update-user.dto';
import { UserResponse } from '../../../responses/user.response';

export const UpdateMeDocumentation: ApiDocumentationParams = {
  authRequired: true,
  body: {
    type: UpdateUserDto,
  },
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name should not be empty
      Name should be a string
      Name should be at least 2 characters long
      Name should be at most 40 characters long
      Surname should not be empty
      Surname should be a string
      Surname should be at least 3 characters long
      Surname should be at most 40 characters long`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
