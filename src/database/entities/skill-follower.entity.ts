import { DbUser } from './user.entity';
import { DbSkill } from './skill.entity';

export class DbSkillFollower {
  userId: string;
  user?: DbUser;
  skillId: string;
  skill?: DbSkill;
  createdAt?: Date;
  updatedAt?: Date;
}
