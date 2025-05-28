import { BaseAnswerDto } from './base-answer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class MultichoiceAnswerDto extends BaseAnswerDto {
  @ApiProperty({
    description: 'Question type (MULTICHOICE)',
    enum: [QuestionTypeEnum.MULTICHOICE],
  })
  type: QuestionTypeEnum.MULTICHOICE;

  @ApiProperty({
    description: 'Answer ids',
  })
  @IsNotEmpty({ message: 'Answer ids must not be empty' })
  @IsArray({ message: 'Answer ids must be an array' })
  @ArrayNotEmpty({ message: 'Answer ids array must not be empty' })
  @IsUUID(undefined, { each: true, message: 'Answer ids must be valid UUIDs' })
  answerIds: string[];
}
