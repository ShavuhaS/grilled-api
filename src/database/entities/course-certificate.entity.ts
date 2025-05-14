import { DbUserCourse } from './user-course.entity';

export class DbCourseCertificate {
  id: string;
  userCourseId: string;
  userCourse?: DbUserCourse;
  link: string;
  createdAt?: Date;
}
