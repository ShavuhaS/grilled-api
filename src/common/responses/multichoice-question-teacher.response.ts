import { TestQuestionResponse } from './test-question.response';
import { ApiProperty } from '@nestjs/swagger';
import { TestQuestionAnswerTeacherResponse } from './test-question-answer-teacher.response';

export class MultichoiceQuestionTeacherResponse extends TestQuestionResponse {
  @ApiProperty({
    description: 'Question answer options',
  })
    answers: TestQuestionAnswerTeacherResponse[];

  @ApiProperty({
    description: 'Right answers (ids)',
  })
    rightAnswers: string[];
}