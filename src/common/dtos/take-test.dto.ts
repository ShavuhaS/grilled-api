import { ChoiceAnswerDto } from './choice-answer.dto';
import { MultichoiceAnswerDto } from './multichoice-answer.dto';
import { ShortAnswerDto } from './short-answer.dto';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseAnswerDto } from './base-answer.dto';
import { QuestionTypeEnum } from '../enums/question-type.enum';

export type AnswerDto = ChoiceAnswerDto | MultichoiceAnswerDto | ShortAnswerDto;

export class TakeTestDto {
  @ApiProperty({
    description: 'Question answers array',
    type: 'array',
    oneOf: [
      { $ref: getSchemaPath(ChoiceAnswerDto) },
      { $ref: getSchemaPath(MultichoiceAnswerDto) },
      { $ref: getSchemaPath(ShortAnswerDto) },
    ],
  })
  @IsNotEmpty({ message: 'Answers must not be empty' })
  @IsArray({ message: 'Answers array must be an array' })
  @ArrayNotEmpty({ message: 'Answers array must not be empty' })
  @Type(() => BaseAnswerDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: ChoiceAnswerDto, name: QuestionTypeEnum.CHOICE },
        { value: MultichoiceAnswerDto, name: QuestionTypeEnum.MULTICHOICE },
        { value: ShortAnswerDto, name: QuestionTypeEnum.SHORT_ANSWER },
      ],
    },
  })
  @ValidateNested({ each: true })
  answers: AnswerDto[];
}
