import { Injectable } from '@nestjs/common';
import {
  AbilityFactory,
  AppAbility,
  Subjects,
} from '../interfaces/ability-factory.interface';
import { CourseAction } from '../actions/course-action.enum';
import { DbUser } from '../../../database/entities/user.entity';
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { RoleEnum } from '../../../common/enums/role.enum';
import { DbCourse } from '../../../database/entities/course.entity';
import { CourseStatusEnum } from '../../../common/enums/course-status.enum';
import { CourseRepository } from '../../../database/repositories/course.repository';

@Injectable()
export class CourseAbilityFactory implements AbilityFactory<CourseAction> {
  constructor (private courseRepository: CourseRepository) {}

  async createForUser (user: DbUser): Promise<AppAbility<CourseAction>> {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility as CreateAbility<AppAbility<CourseAction>>,
    );

    if (user.role === RoleEnum.STUDENT) {
      await this.setStudentAbility(user, can, cannot);
    } else if (user.role === RoleEnum.TEACHER) {
      this.setTeacherAbility(user, can, cannot);
    } else if (user.role === RoleEnum.ADMIN) {
      can(CourseAction.MANAGE, DbCourse);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  async setStudentAbility (
    user: DbUser,
    can: AbilityBuilder<AppAbility<CourseAction>>['can'],
    cannot: AbilityBuilder<AppAbility<CourseAction>>['cannot'],
  ) {
    cannot(CourseAction.MANAGE, DbCourse);
    can([CourseAction.READ, CourseAction.ENROLL], DbCourse, {
      status: CourseStatusEnum.PUBLISHED,
    });

    const userCourses = await this.courseRepository.findMany({
      enrollees: { some: { userId: user.id } },
    });

    const courseIds = userCourses.map(({ id }) => id);

    can(CourseAction.ACCESS_CONTENT, DbCourse, {
      id: { $in: courseIds },
    });
  }

  setTeacherAbility (
    user: DbUser,
    can: AbilityBuilder<AppAbility<CourseAction>>['can'],
    cannot: AbilityBuilder<AppAbility<CourseAction>>['cannot'],
  ) {
    cannot(CourseAction.MANAGE, DbCourse);
    can(CourseAction.CREATE, DbCourse);
    can(CourseAction.READ, DbCourse);
    can([CourseAction.UPDATE, CourseAction.DELETE, CourseAction.ACCESS_CONTENT], DbCourse, {
      authorId: user.id,
    });
    cannot([CourseAction.UPDATE, CourseAction.DELETE], DbCourse, {
      enrolledCount: { $gt: 0 },
    });
  }
}
