import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ChoiceQuestionTeacherResponse } from './choice-question-teacher.response';
import { MultichoiceQuestionTeacherResponse } from './multichoice-question-teacher.response';
import { ShortAnswerQuestionTeacherResponse } from './short-answer-question-teacher.response';

export type TestQuestionTeacherResponse =
  | ChoiceQuestionTeacherResponse
  | MultichoiceQuestionTeacherResponse
  | ShortAnswerQuestionTeacherResponse;

@ApiExtraModels(
  ChoiceQuestionTeacherResponse,
  MultichoiceQuestionTeacherResponse,
  ShortAnswerQuestionTeacherResponse,
)
export class TestTeacherResponse {
  @ApiProperty({
    description: 'Number of questions in the test',
    type: 'integer',
  })
  questionCount: number;

  @ApiProperty({
    description: 'List of questions (with answers)',
    oneOf: [
      { $ref: getSchemaPath(ChoiceQuestionTeacherResponse) },
      { $ref: getSchemaPath(MultichoiceQuestionTeacherResponse) },
      { $ref: getSchemaPath(ShortAnswerQuestionTeacherResponse) },
    ],
  })
  questions: TestQuestionTeacherResponse[];
}
