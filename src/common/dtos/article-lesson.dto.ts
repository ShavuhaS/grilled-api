import { BaseLessonDto } from './base-lesson.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty, IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { LessonTypeEnum } from '../enums/lesson-type.enum';

export class ArticleLessonDto extends BaseLessonDto {
  @ApiProperty({
    description: 'Article content',
  })
  @IsNotEmpty({ message: 'Article must not be empty' })
  @IsString({ message: 'Article must be a string' })
  @MinLength(50, { message: 'Article must be at least 50 characters long' })
  @MaxLength(5000, { message: 'Article must be at most 5000 characters long' })
    article: string;

  @ApiProperty({
    description: 'Lesson type (ARTICLE)',
    enum: [LessonTypeEnum.ARTICLE],
  })
    type: LessonTypeEnum.ARTICLE;

  @ApiProperty({
    description:
      'Estimated time in minutes to complete the lesson (required if lesson type is ARTICLE)',
  })
  @IsNotEmpty({ message: 'Article must not be empty' })
  @IsInt({ message: 'Estimated time must be an integer' })
  @Min(1, { message: 'Estimated time must be positive' })
  @Max(180, { message: 'Estimated time can not be longer than 3 hours' })
    estimatedTime: number;
}
