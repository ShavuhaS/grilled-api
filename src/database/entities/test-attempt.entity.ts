import { DbUser } from './user.entity';
import { DbLessonTest } from './lesson-test.entity';
import { DecimalNumber } from '../types/decimal.type';
import { DbTestAttemptAnswer } from './test-attempt-answer.entity';

export class DbTestAttempt {
  id: string;
  userId: string;
  user?: DbUser;
  testId: string;
  test?: DbLessonTest;
  result?: DecimalNumber;
  createdAt?: Date;
  updatedAt?: Date;
  answers?: DbTestAttemptAnswer[];
}
