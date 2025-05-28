import { AnswerDto } from '../../../common/dtos/take-test.dto';

export type EvaluateAnswerFunction = (answer: AnswerDto) => Promise<number>;
