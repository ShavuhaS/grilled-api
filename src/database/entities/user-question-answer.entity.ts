import { DbUser } from './user.entity';
import { DbTestQuestion } from './test-question.entity';
import { DbUserChoiceAnswer } from './user-choice-answer.entity';

export class DbUserQuestionAnswer {
  id: string;
  userId: string;
  user?: DbUser;
  testQuestionId: string;
  testQuestion?: DbTestQuestion;
  answer?: string;
  createdAt?: Date;
  updatedAt?: Date;
  choices?: DbUserChoiceAnswer[];
}