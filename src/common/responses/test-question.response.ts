import { ApiProperty } from '@nestjs/swagger';
import { QuestionTypeEnum } from '../enums/question-type.enum';

export class TestQuestionResponse {
  @ApiProperty({
    description: 'Question id',
  })
    id: string;

  @ApiProperty({
    description: 'Question text',
  })
    text: string;

  @ApiProperty({
    description: 'Question type',
    enum: QuestionTypeEnum,
  })
    type: QuestionTypeEnum;
}