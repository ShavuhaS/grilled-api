import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TestQuestionAnswerDto {
  @ApiProperty({
    description: 'Answer text',
  })
  @IsNotEmpty({ message: 'Answer text must not be empty' })
  @IsString({ message: 'Answer text must be a string' })
  text: string;

  @ApiPropertyOptional({
    description: 'Answer commentary (why it correct or wrong)',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Answer commentary must not be empty' })
  @IsString({ message: 'Answer commentary must be a string' })
  commentary?: string;
}
