import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  Equals,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { TestQuestionAnswerDto } from './test-question-answer.dto';

export type TestQuestionDto =
  | ChoiceTestQuestionDto
  | MultiChoiceTestQuestionDto
  | ShortTestQuestionDto;

export class BaseTestQuestionDto {
  @ApiProperty({
    description: 'Test question text',
  })
  @IsNotEmpty({ message: 'Question text must not be empty' })
  @IsString({ message: 'Question text must be a string' })
  @MinLength(5, { message: 'Question test must be at least 5 characters long' })
  @MaxLength(300, {
    message: 'Question test must be at most 300 characters long',
  })
    text: string;

  @IsNotEmpty({ message: 'Question type must not be empty' })
  @IsEnum(
    [
      QuestionTypeEnum.CHOICE,
      QuestionTypeEnum.MULTICHOICE,
      QuestionTypeEnum.SHORT_ANSWER,
    ],
    { message: 'Question type must be CHOICE, MULTICHOICE or SHORT_ANSWER' },
  )
    type: QuestionTypeEnum;
}

export class ChoiceTestQuestionDto extends BaseTestQuestionDto {
  @ApiProperty({
    description: 'Question type (CHOICE)',
    enum: [QuestionTypeEnum.CHOICE],
  })
    type: QuestionTypeEnum.CHOICE;

  @ApiProperty({
    description: 'Right answer to the question (index in the array of answers)',
  })
  @IsNotEmpty({ message: 'Question right answer must not be empty' })
  @IsInt({ message: 'Question right answer must be an integer' })
  @Min(0, { message: 'Question right answer must not be negative' })
    rightAnswer: number;

  @ApiProperty({
    description: 'Possible question answers',
  })
  @Type(() => TestQuestionAnswerDto)
  @ValidateNested({ each: true })
  @IsArray({ message: 'Question answers must be an array' })
  @ArrayNotEmpty({ message: 'Question answers must not be empty' })
    answers: TestQuestionAnswerDto[];
}

export class MultiChoiceTestQuestionDto extends BaseTestQuestionDto {
  @ApiProperty({
    description: 'Question type (MULTICHOICE)',
    enum: [QuestionTypeEnum.MULTICHOICE],
  })
    type: QuestionTypeEnum.MULTICHOICE;

  @ApiProperty({
    description:
      'Right answers to the question (indices in the array of answers)',
  })
  @IsNotEmpty({ message: 'Question right answers must not be empty' })
  @IsArray({ message: 'Question right answers must be an array' })
  @ArrayNotEmpty({ message: 'Question right answers must not be empty' })
  @IsInt({ each: true, message: 'Question right answers must be an integer' })
  @Min(0, {
    each: true,
    message: 'Question right answers must not be negative',
  })
    rightAnswers: number[];

  @ApiProperty({
    description: 'Possible question answers',
  })
  @Type(() => TestQuestionAnswerDto)
  @IsArray({ message: 'Question answers must be an array' })
  @ArrayNotEmpty({ message: 'Question answers must not be empty' })
  @ValidateNested({ each: true })
    answers: TestQuestionAnswerDto[];
}

export class ShortTestQuestionDto extends BaseTestQuestionDto {
  @ApiProperty({
    description: 'Question type (SHORT_ANSWER)',
    enum: [QuestionTypeEnum.SHORT_ANSWER],
  })
    type: QuestionTypeEnum.SHORT_ANSWER;

  @ApiProperty({
    description: 'Right answer to the question',
  })
  @IsNotEmptyObject({}, { message: 'Question right answer must not be empty' })
  @Type(() => TestQuestionAnswerDto)
  @ValidateNested()
    rightAnswer: TestQuestionAnswerDto;
}
