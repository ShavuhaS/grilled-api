import { DbUser } from './user.entity';
import { DbCourse } from './course.entity';
import { DbCourseCertificate } from './course-certificate.entity';
import { DbCourseReview } from './course-review.entity';

export class DbUserCourse {
  id: string;
  userId: string;
  user?: DbUser;
  courseId: string;
  course?: DbCourse;
  createdAt?: Date;
  updatedAt?: Date;
  certificate?: DbCourseCertificate;
  review?: DbCourseReview;
}