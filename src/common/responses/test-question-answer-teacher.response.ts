import { ApiProperty } from '@nestjs/swagger';

export class TestQuestionAnswerTeacherResponse {
  @ApiProperty({
    description: 'Answer id',
  })
    id: string;

  @ApiProperty({
    description: 'Answer text',
  })
    answer: string;

  @ApiProperty({
    description: 'Answer commentary (why it is right or wrong)',
  })
    commentary: string;
}