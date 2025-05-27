import { PolicyHandler } from '../../interfaces/policy-handler.interface';
import { SkillAction } from '../../../../common/enums/skill-action.enum';
import { skillFollowPolicy } from './follow';
import { skillUnfollowPolicy } from './unfollow';

export const SkillPolicies = {
  FOLLOW: skillFollowPolicy,
  UNFOLLOW: skillUnfollowPolicy,
} satisfies Record<string, PolicyHandler<SkillAction>>;
