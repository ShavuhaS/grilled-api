import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { UpdateMeDocumentation } from './update-me';
import { UpdateAvatarDocumentation } from './update-avatar';

export const UserDocumentation = {
  UPDATE_ME: UpdateMeDocumentation,
  UPDATE_AVATAR: UpdateAvatarDocumentation,
} satisfies Record<string, ApiDocumentationParams>;
