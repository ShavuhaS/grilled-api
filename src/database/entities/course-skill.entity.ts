import { DbCourse } from './course.entity';
import { DbSkill } from './skill.entity';

export class DbCourseSkill {
  courseId: string;
  course?: DbCourse;
  skillId: string;
  skill?: DbSkill;
  createdAt?: Date;
  updatedAt?: Date;
}
