import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { UpdateMeDocumentation } from './update-me';
import { UpdateAvatarDocumentation } from './update-avatar';
import { GetCoursesDocumentation } from './get-courses';

export const UserDocumentation = {
  UPDATE_ME: UpdateMeDocumentation,
  UPDATE_AVATAR: UpdateAvatarDocumentation,
  GET_COURSES: GetCoursesDocumentation,
} satisfies Record<string, ApiDocumentationParams>;
