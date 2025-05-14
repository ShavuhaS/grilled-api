import { DbTestQuestion } from './test-question.entity';
import { DbUserChoiceAnswer } from './user-choice-answer.entity';

export class DbTestQuestionAnswer {
  id: string;
  questionId: string;
  question?: DbTestQuestion;
  text: string;
  commentary?: string;
  correct: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  chosenBy?: DbUserChoiceAnswer[];
}
