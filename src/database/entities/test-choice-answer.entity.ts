import { DbTestAttemptAnswer } from './test-attempt-answer.entity';
import { DbTestQuestionAnswer } from './test-question-answer.entity';

export class DbTestChoiceAnswer {
  attemptAnswerId: string;
  attemptAnswer?: DbTestAttemptAnswer;
  testAnswerId: string;
  testAnswer?: DbTestQuestionAnswer;
  createdAt?: Date;
  updatedAt?: Date;
}
