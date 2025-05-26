import { DbCourseSkill } from './course-skill.entity';
import { DbSkillFollower } from './skill-follower.entity';
import { Sortable } from '../interfaces/sortable.interface';

export class DbSkill implements Sortable<DbSkill> {
  get sortFields(): readonly (keyof DbSkill)[] {
    return ['name', 'createdAt'];
  }

  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  followers?: DbSkillFollower[];
  courses?: DbCourseSkill[];
}
