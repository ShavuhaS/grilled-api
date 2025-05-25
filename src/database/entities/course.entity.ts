import { DbTeacher } from './teacher.entity';
import { DbCourseCategory } from './course-category.entity';
import { CourseLevelEnum } from '../../common/enums/course-level.enum';
import { CourseStatusEnum } from '../../common/enums/course-status.enum';
import { DbCourseSkill } from './course-skill.entity';
import { DbUserCourse } from './user-course.entity';
import { DbCourseQuestion } from './course-question.entity';
import { DbCourseModule } from './course-module.entity';
import { DecimalNumber } from '../types/decimal.type';
import { Type } from 'class-transformer';

export class DbCourse {
  id: string;
  authorId: string;
  author?: DbTeacher;
  categoryId: string;
  category?: DbCourseCategory;
  publishedVersionId?: string;
  publishedVersion?: DbCourse;
  versions?: DbCourse[];
  name: string;
  about: string;
  level: CourseLevelEnum;
  status: CourseStatusEnum;
  estimatedTime: number;
  enrolledCount: number;
  @Type(() => DecimalNumber)
  avgRating: DecimalNumber;
  reviewCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  skills?: DbCourseSkill[];
  enrollees?: DbUserCourse[];
  questions?: DbCourseQuestion[];
  modules?: DbCourseModule[];
}
