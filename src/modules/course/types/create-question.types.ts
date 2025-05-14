import { TestQuestionDto } from '../../../common/dtos/test-question.dto';
import { DbTestQuestion } from '../../../database/entities/test-question.entity';

export type CreateTestQuestionFunction = (testId: string, question: TestQuestionDto) => Promise<DbTestQuestion>;