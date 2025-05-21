import { ApiProperty } from '@nestjs/swagger';

export class TestScoreResponse {
  @ApiProperty({
    description: 'User score',
  })
    score: number;

  @ApiProperty({
    description: 'Max test score',
  })
    maxScore: number;
}