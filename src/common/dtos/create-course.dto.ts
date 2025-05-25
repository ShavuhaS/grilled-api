import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CourseLevelEnum } from '../enums/course-level.enum';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Course category id',
  })
  @IsNotEmpty({ message: 'Category id must not be empty' })
  @IsUUID(undefined, { message: 'Category id must be a valid UUID' })
  categoryId: string;

  @ApiProperty({
    description: 'Course name',
  })
  @IsNotEmpty({ message: 'Course name must not be empty' })
  @IsString({ message: 'Course name must be a string' })
  @MinLength(5, { message: 'Course name must be at least 5 characters long' })
  @MaxLength(60, { message: 'Course name must be at most 60 characters long' })
  name: string;

  @ApiProperty({
    description: 'Course description',
  })
  @IsNotEmpty({ message: 'Course description must not be empty' })
  @IsString({ message: 'Course description must be a string' })
  @MaxLength(1000, {
    message: 'Course decription must be at most 1000 characters long',
  })
  about: string;

  @ApiProperty({
    description: 'Course level (BEGINNER, INTERMEDIATE or EXPERT)',
    enum: CourseLevelEnum,
  })
  @IsNotEmpty({ message: 'Course level must not be empty' })
  @IsEnum(CourseLevelEnum, {
    message: 'Course level must be either BEGINNER, INTERMEDIATE or EXPERT',
  })
  level: CourseLevelEnum;
}
