import { BaseLessonDto } from './base-lesson.dto';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
import {
  ArrayNotEmpty,
  Equals,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  TestQuestionDto,
  ChoiceTestQuestionDto,
  MultiChoiceTestQuestionDto,
  ShortTestQuestionDto,
  BaseTestQuestionDto,
} from './test-question.dto';
import { Type } from 'class-transformer';
import { QuestionTypeEnum } from '../enums/question-type.enum';

@ApiExtraModels(
  ChoiceTestQuestionDto,
  MultiChoiceTestQuestionDto,
  ShortTestQuestionDto,
)
export class TestLessonDto extends BaseLessonDto {
  @ApiProperty({
    description: 'Lesson type (TEST)',
    enum: [LessonTypeEnum.TEST],
  })
    type: LessonTypeEnum.TEST;

  @ApiPropertyOptional({
    description:
      'Estimated time in minutes to complete the lesson (required if lesson type is ARTICLE)',
  })
  @IsOptional()
  @IsInt({ message: 'Estimated time must be an integer' })
  @Min(1, { message: 'Estimated time must be positive' })
  @Max(180, { message: 'Estimated time can not be longer than 3 hours' })
    estimatedTime?: number;

  @ApiProperty({
    description: 'Test questions',
    type: 'array',
    items: {
      oneOf: [
        { $ref: getSchemaPath(ChoiceTestQuestionDto) },
        { $ref: getSchemaPath(MultiChoiceTestQuestionDto) },
        { $ref: getSchemaPath(ShortTestQuestionDto) },
      ],
    },
  })
  @IsArray({ message: 'Test questions must be an array' })
  @Type(() => BaseTestQuestionDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: ChoiceTestQuestionDto, name: QuestionTypeEnum.CHOICE },
        {
          value: MultiChoiceTestQuestionDto,
          name: QuestionTypeEnum.MULTICHOICE,
        },
        { value: ShortTestQuestionDto, name: QuestionTypeEnum.SHORT_ANSWER },
      ],
    },
  })
  @ValidateNested({ each: true })
    questions: TestQuestionDto[];
}
