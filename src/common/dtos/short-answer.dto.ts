import { BaseAnswerDto } from './base-answer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShortAnswerDto extends BaseAnswerDto {
  @ApiProperty({
    description: 'Question type (SHORT_ANSWER)',
    enum: [QuestionTypeEnum.SHORT_ANSWER],
  })
  type: QuestionTypeEnum.SHORT_ANSWER;

  @ApiProperty({
    description: 'Answer text',
  })
  @IsNotEmpty({ message: 'Answer must not be empty' })
  @IsString({ message: 'Answer must be a string' })
  answer: string;
}
