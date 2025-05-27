import { ApiProperty } from '@nestjs/swagger';

export class BaseTestResponse {
  @ApiProperty({
    description: 'Test id',
  })
  id: string;

  @ApiProperty({
    description: 'Number of questions in the test',
    type: 'integer',
  })
  questionCount: number;
}
