import { DbSkill } from '../entities/skill.entity';
import { DbCourse } from '../entities/course.entity';

export interface EntityMap {
  DbSkill: DbSkill;
  DbCourse: DbCourse;
}
