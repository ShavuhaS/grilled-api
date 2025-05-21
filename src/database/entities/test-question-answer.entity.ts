import { DbTestQuestion } from './test-question.entity';
import { DbTestChoiceAnswer } from './test-choice-answer.entity';

export class DbTestQuestionAnswer {
  id: string;
  questionId: string;
  question?: DbTestQuestion;
  text: string;
  commentary?: string;
  correct: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  chosenBy?: DbTestChoiceAnswer[];
}
