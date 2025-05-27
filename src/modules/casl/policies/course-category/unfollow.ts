import { PolicyHandlerCallback } from '../../interfaces/policy-handler.interface';
import { AppAbility } from '../../interfaces/ability-factory.interface';
import { Request } from 'express';
import { CourseCategoryAction } from '../../../../common/enums/course-category-action.enum';
import { DbCourseCategory } from '../../../../database/entities/course-category.entity';

export const courseCategoryUnfollowPolicy: PolicyHandlerCallback<
  CourseCategoryAction
> = (ability: AppAbility<CourseCategoryAction>, req: Request) => {
  return ability.can(CourseCategoryAction.UNFOLLOW, DbCourseCategory);
};
