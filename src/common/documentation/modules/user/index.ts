import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { UpdateMeDocumentation } from './update-me';
import { UpdateAvatarDocumentation } from './update-avatar';
import { GetCoursesDocumentation } from './get-courses';
import { GetCategoriesDocumentation } from './get-categories';
import { GetSkillsDocumentation } from './get-skills';

export const UserDocumentation = {
  UPDATE_ME: UpdateMeDocumentation,
  UPDATE_AVATAR: UpdateAvatarDocumentation,
  GET_COURSES: GetCoursesDocumentation,
  GET_CATEGORIES: GetCategoriesDocumentation,
  GET_SKILLS: GetSkillsDocumentation,
} satisfies Record<string, ApiDocumentationParams>;
