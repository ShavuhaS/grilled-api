import { DbCourseSkill } from './course-skill.entity';
import { DbSkillFollower } from './skill-follower.entity';

export class DbSkill {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  followers?: DbSkillFollower[];
  courses?: DbCourseSkill[];
}
