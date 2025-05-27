import { Injectable } from '@nestjs/common';
import {
  AbilityFactory,
  AppAbility,
  Subjects,
} from '../interfaces/ability-factory.interface';
import { SkillAction } from '../../../common/enums/skill-action.enum';
import { DbUser } from 'src/database/entities/user.entity';
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { DbSkill } from '../../../database/entities/skill.entity';
import { RoleEnum } from '../../../common/enums/role.enum';

@Injectable()
export class SkillAbilityFactory implements AbilityFactory<SkillAction> {
  async createForUser(user: DbUser): Promise<AppAbility<SkillAction>> {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility as CreateAbility<AppAbility<SkillAction>>,
    );

    cannot(SkillAction.MANAGE, DbSkill);
    can(SkillAction.READ, DbSkill);
    if (user.role === RoleEnum.STUDENT) {
      can(SkillAction.FOLLOW, DbSkill);
      can(SkillAction.UNFOLLOW, DbSkill);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
