import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { UploadAvatarDto } from '../../../dtos/upload-avatar.dto';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';

export const UpdateAvatarDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the course owner can update the course avatar'],
  acceptsFile: true,
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
  ],
  body: {
    type: UploadAvatarDto,
  },
  ok: {},
  badRequest: {
    description: `
    InvalidEntityIdException:
      Course with such id was not found
      
    NoFileException:
      No file provided
      
    InvalidFileTypeException:
      Unsupported file extension
      
    FileIsTooLargeException:
      File is too large (maximum size: 5MB)`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
