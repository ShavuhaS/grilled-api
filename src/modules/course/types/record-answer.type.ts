import { AnswerDto } from '../../../common/dtos/take-test.dto';

export type RecordAnswerFunction = (
  attemptId: string,
  answer: AnswerDto,
) => Promise<undefined>;
