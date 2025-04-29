import { DbUser } from './user.entity';
import { DbCourseQuestion } from './course-question.entity';

export class DbCourseQuestionReply {
  id: string;
  userId: string;
  user?: DbUser;
  courseQuestionId: string;
  courseQuestion?: DbCourseQuestion;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}