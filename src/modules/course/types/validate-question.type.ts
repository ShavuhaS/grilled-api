import { TestQuestionDto } from '../../../common/dtos/test-question.dto';

export type ValidateQuestionFunction = (question: TestQuestionDto) => boolean;
