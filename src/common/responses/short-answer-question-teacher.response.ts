import { TestQuestionResponse } from './test-question.response';
import { ApiProperty } from '@nestjs/swagger';

export class ShortAnswerQuestionTeacherResponse extends TestQuestionResponse {
  @ApiProperty({
    description: 'Right answer id',
  })
    answerId: string;

  @ApiProperty({
    description: 'Right answer (text)',
  })
    answer: string;
}
