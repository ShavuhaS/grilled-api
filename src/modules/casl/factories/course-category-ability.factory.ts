import { Injectable } from '@nestjs/common';
import {
  AbilityFactory,
  AppAbility,
  Subjects,
} from '../interfaces/ability-factory.interface';
import { DbUser } from 'src/database/entities/user.entity';
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { RoleEnum } from '../../../common/enums/role.enum';
import { CourseCategoryAction } from '../../../common/enums/course-category-action.enum';
import { DbCourseCategory } from '../../../database/entities/course-category.entity';

@Injectable()
export class CourseCategoryAbilityFactory
  implements AbilityFactory<CourseCategoryAction>
{
  async createForUser(user: DbUser): Promise<AppAbility<CourseCategoryAction>> {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility as CreateAbility<AppAbility<CourseCategoryAction>>,
    );

    cannot(CourseCategoryAction.MANAGE, DbCourseCategory);
    can(CourseCategoryAction.READ, DbCourseCategory);
    if (user.role === RoleEnum.STUDENT) {
      can(CourseCategoryAction.FOLLOW, DbCourseCategory);
      can(CourseCategoryAction.UNFOLLOW, DbCourseCategory);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
