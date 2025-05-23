import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Equals,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
import { LessonLinkDto } from './lesson-link.dto';
import { Type } from 'class-transformer';

export class BaseLessonDto {
  @ApiProperty({
    description: 'Lesson name',
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(5, { message: 'Name must be at least 5 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
    name: string;

  @IsNotEmpty({ message: 'Type must not be empty' })
  @IsEnum(LessonTypeEnum, { message: 'Type must be ARTICLE, VIDEO or TEST' })
    type: LessonTypeEnum;

  @ApiPropertyOptional({
    description: 'Lesson useful links',
    type: [LessonLinkDto],
  })
  @IsOptional()
  @IsArray({ message: 'Links must be an array' })
  @Type(() => LessonLinkDto)
  @ValidateNested({ each: true })
    links?: LessonLinkDto[];

  @IsInt({ message: 'Estimated time must be an integer' })
  @Min(1, { message: 'Estimated time must be positive' })
  @Max(180, { message: 'Estimated time can not be longer than 3 hours' })
    estimatedTime?: number;
}
