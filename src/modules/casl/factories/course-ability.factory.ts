import { Injectable } from '@nestjs/common';
import { AbilityFactory, AppAbility, Subjects } from '../interfaces/ability-factory.interface';
import { CourseAction } from '../actions/course-action.enum';
import { DbUser } from '../../../database/entities/user.entity';
import { AbilityBuilder, CreateAbility, createMongoAbility, ExtractSubjectType } from '@casl/ability';
import { RoleEnum } from '../../../common/enums/role.enum';
import { DbCourse } from '../../../database/entities/course.entity';
import { CourseStatusEnum } from '../../../common/enums/course-status.enum';

@Injectable()
export class CourseAbilityFactory implements AbilityFactory<CourseAction> {
  async createForUser (user: DbUser): Promise<AppAbility<CourseAction>> {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility as CreateAbility<AppAbility<CourseAction>>
    );

    if (user.role === RoleEnum.STUDENT) {
      cannot(CourseAction.MANAGE, DbCourse);
      can(CourseAction.ENROLL, DbCourse, { status: CourseStatusEnum.PUBLISHED });
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}