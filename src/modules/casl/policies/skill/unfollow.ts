import { PolicyHandlerCallback } from '../../interfaces/policy-handler.interface';
import { SkillAction } from '../../../../common/enums/skill-action.enum';
import { AppAbility } from '../../interfaces/ability-factory.interface';
import { Request } from 'express';
import { DbSkill } from '../../../../database/entities/skill.entity';

export const skillUnfollowPolicy: PolicyHandlerCallback<SkillAction> = (
  ability: AppAbility<SkillAction>,
  req: Request,
) => {
  return ability.can(SkillAction.UNFOLLOW, DbSkill);
};
