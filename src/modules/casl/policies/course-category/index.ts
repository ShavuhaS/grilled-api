import { CourseCategoryAction } from '../../../../common/enums/course-category-action.enum';
import { PolicyHandler } from '../../interfaces/policy-handler.interface';
import { courseCategoryFollowPolicy } from './follow';
import { courseCategoryUnfollowPolicy } from './unfollow';

export const CourseCategoryPolicies = {
  FOLLOW: courseCategoryFollowPolicy,
  UNFOLLOW: courseCategoryUnfollowPolicy,
} satisfies Record<string, PolicyHandler<CourseCategoryAction>>;
