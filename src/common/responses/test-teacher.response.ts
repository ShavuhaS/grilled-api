import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ChoiceQuestionTeacherResponse } from './choice-question-teacher.response';
import { MultichoiceQuestionTeacherResponse } from './multichoice-question-teacher.response';
import { ShortAnswerQuestionTeacherResponse } from './short-answer-question-teacher.response';
import { BaseTestResponse } from './base-test.response';

export type TestQuestionTeacherResponse =
  | ChoiceQuestionTeacherResponse
  | MultichoiceQuestionTeacherResponse
  | ShortAnswerQuestionTeacherResponse;

@ApiExtraModels(
  ChoiceQuestionTeacherResponse,
  MultichoiceQuestionTeacherResponse,
  ShortAnswerQuestionTeacherResponse,
)
export class TestTeacherResponse extends BaseTestResponse {
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
