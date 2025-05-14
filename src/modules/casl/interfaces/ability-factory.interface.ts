import { DbUser } from '../../../database/entities/user.entity';
import { InferSubjects, MongoAbility } from '@casl/ability';
import { DbTeacher } from '../../../database/entities/teacher.entity';
import { DbCourse } from '../../../database/entities/course.entity';
import { DbCourseModule } from '../../../database/entities/course-module.entity';

export type Subjects =
  | InferSubjects<
      typeof DbUser | typeof DbTeacher | typeof DbCourse | typeof DbCourseModule
    >
  | 'all';

export type AppAbility<T extends string> = MongoAbility<[T, Subjects]>;

export interface AbilityFactory<T extends string = string> {
  createForUser(user: DbUser): AppAbility<T> | Promise<AppAbility<T>>;
}
