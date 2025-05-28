import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class BaseAnswerDto {
  @IsNotEmpty({ message: 'Question type must not be empty' })
  @IsEnum(
    [
      QuestionTypeEnum.CHOICE,
      QuestionTypeEnum.MULTICHOICE,
      QuestionTypeEnum.SHORT_ANSWER,
    ],
    { message: 'Question type must be a valid enum' },
  )
  type: QuestionTypeEnum;

  @ApiProperty({
    description: 'Question id',
  })
  @IsNotEmpty({ message: 'Question must not be empty' })
  @IsUUID(undefined, { message: 'Question must be a valid UUID' })
  questionId: string;
}
