import { DbUserQuestionAnswer } from './user-question-answer.entity';
import { DbTestQuestionAnswer } from './test-question-answer.entity';

export class DbUserChoiceAnswer {
  userAnswerId: string;
  userAnswer?: DbUserQuestionAnswer;
  testAnswerId: string;
  testAnswer?: DbTestQuestionAnswer;
  createdAt?: Date;
  updatedAt?: Date;
}
