import { DbLessonTest } from './lesson-test.entity';
import { QuestionTypeEnum } from '../../common/enums/question-type.enum';
import { DbTestQuestionAnswer } from './test-question-answer.entity';
import { DbUserQuestionAnswer } from './user-question-answer.entity';

export class DbTestQuestion {
  id: string;
  testId: string;
  test?: DbLessonTest;
  text: string;
  type: QuestionTypeEnum;
  createdAt?: Date;
  updatedAt?: Date;
  answers?: DbTestQuestionAnswer[];
  userAnswers?: DbUserQuestionAnswer[];
}
