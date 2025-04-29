import { DbUser } from './user.entity';
import { DbCourseLesson } from './course-lesson.entity';

export class DbCompletedLesson {
  userId: string;
  user?: DbUser;
  lessonId: string;
  lesson?: DbCourseLesson;
  createdAt?: Date;
  updatedAt?: Date;
}