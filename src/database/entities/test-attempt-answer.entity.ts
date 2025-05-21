import { DbTestQuestion } from './test-question.entity';
import { DbTestChoiceAnswer } from './test-choice-answer.entity';
import { DbTestAttempt } from './test-attempt.entity';

export class DbTestAttemptAnswer {
  id: string;
  attemptId: string;
  attempt?: DbTestAttempt;
  testQuestionId: string;
  testQuestion?: DbTestQuestion;
  answer?: string;
  createdAt?: Date;
  updatedAt?: Date;
  choices?: DbTestChoiceAnswer[];
}
