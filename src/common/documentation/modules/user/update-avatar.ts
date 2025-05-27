import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { UploadAvatarDto } from '../../../dtos/upload-avatar.dto';
import { UserResponse } from '../../../responses/user.response';

export const UpdateAvatarDocumentation: ApiDocumentationParams = {
  authRequired: true,
  acceptsFile: true,
  body: {
    type: UploadAvatarDto,
  },
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    NoFileException:
      No file provided
      
    InvalidFileTypeException:
      Unsupported file extension
      
    FileIsTooLargeException:
      File is too large (maximum size: 5MB)`,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
