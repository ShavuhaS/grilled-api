import { BaseAnswerDto } from './base-answer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ChoiceAnswerDto extends BaseAnswerDto {
  @ApiProperty({
    description: 'Question type (CHOICE)',
    enum: [QuestionTypeEnum.CHOICE],
  })
  type: QuestionTypeEnum.CHOICE;

  @ApiProperty({
    description: 'Id of the right answer',
  })
  @IsNotEmpty({ message: 'Answer id must not be empty' })
  @IsUUID(undefined, { message: 'Answer id must be a valid UUID' })
  answerId: string;
}
