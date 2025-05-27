import { ApiProperty } from '@nestjs/swagger';

export class TestQuestionAnswerStudentResponse {
  @ApiProperty({
    description: 'Answer id',
  })
  id: string;

  @ApiProperty({
    description: 'Answer text',
  })
  answer: string;
}
