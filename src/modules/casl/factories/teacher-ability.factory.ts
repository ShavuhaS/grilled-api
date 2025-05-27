import { Injectable } from '@nestjs/common';
import {
  AbilityFactory,
  AppAbility,
  Subjects,
} from '../interfaces/ability-factory.interface';
import { TeacherAction } from '../../../common/enums/teacher-action.enum';
import { DbUser } from 'src/database/entities/user.entity';
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { DbTeacher } from '../../../database/entities/teacher.entity';
import { RoleEnum } from '../../../common/enums/role.enum';

@Injectable()
export class TeacherAbilityFactory implements AbilityFactory<TeacherAction> {
  async createForUser(user: DbUser): Promise<AppAbility<TeacherAction>> {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility as CreateAbility<AppAbility<TeacherAction>>,
    );

    cannot(TeacherAction.MANAGE, DbTeacher);
    can(TeacherAction.READ, DbTeacher);
    if (user.role === RoleEnum.TEACHER) {
      can(TeacherAction.UPDATE, DbTeacher, { userId: user.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
