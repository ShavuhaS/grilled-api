import { DbUser } from './user.entity';
import { DbLessonTest } from './lesson-test.entity';

export class DbTestResult {
  userId: string;
  user?: DbUser;
  testId: string;
  test?: DbLessonTest;
  result: number;
  createdAt?: Date;
  updatedAt?: Date;
}