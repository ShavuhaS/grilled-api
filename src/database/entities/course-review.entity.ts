import { DbUserCourse } from './user-course.entity';

export class DbCourseReview {
  id: string;
  userCourseId: string;
  userCourse?: DbUserCourse;
  text?: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}