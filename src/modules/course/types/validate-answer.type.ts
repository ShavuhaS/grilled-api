import { AnswerDto } from '../../../common/dtos/take-test.dto';

export type ValidateAnswerFunction = (
  testId: string,
  answer: AnswerDto,
) => Promise<undefined>;
