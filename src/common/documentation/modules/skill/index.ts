import { GetAllDocumentation } from './get-all';
import { FollowDocumentation } from './follow';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { UnfollowDocumentation } from './unfollow';

export const SkillDocumentation = {
  GET_ALL: GetAllDocumentation,
  FOLLOW: FollowDocumentation,
  UNFOLLOW: UnfollowDocumentation,
} satisfies Record<string, ApiDocumentationParams>;
