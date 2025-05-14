import { DbUser } from './user.entity';
import { DbCourse } from './course.entity';
import { DbCourseQuestionReply } from './course-question-reply.entity';

export class DbCourseQuestion {
  id: string;
  userId?: string;
  user?: DbUser;
  courseId: string;
  course?: DbCourse;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  replies?: DbCourseQuestionReply[];
}
