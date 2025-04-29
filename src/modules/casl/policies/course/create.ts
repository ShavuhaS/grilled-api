import { Request } from 'express';
import { PolicyHandlerCallback } from '../../interfaces/policy-handler.interface';
import { CourseAction } from '../../actions/course-action.enum';
import { AppAbility } from '../../interfaces/ability-factory.interface';
import { DbCourse } from '../../../../database/entities/course.entity';

export const courseCreatePolicy: PolicyHandlerCallback<CourseAction> =
  (ability: AppAbility<CourseAction>, req: Request): boolean => {
    return ability.can(CourseAction.CREATE, DbCourse);
  };