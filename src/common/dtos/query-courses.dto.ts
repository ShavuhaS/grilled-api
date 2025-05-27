import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  Max,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CourseLevelEnum } from '../enums/course-level.enum';
import { CourseStatusEnum } from '../enums/course-status.enum';
import {
  getOrderByFormat,
  getOrderByRegex,
} from '../utils/get-order-by-regex.util';
import { DbCourse } from '../../database/entities/course.entity';
import { PageDto } from './page.dto';

class CourseCategoryFilter {
  @ApiPropertyOptional({
    description: 'Ids of course categories (separated by commas)',
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsUUID(undefined, {
    each: true,
    message: 'Each of the category ids must be a valid UUID',
  })
  in?: string[];
}

class SkillFilter {
  @ApiPropertyOptional({
    description: 'Ids of course skills (separated by commas)',
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsUUID(undefined, {
    each: true,
    message: 'Each of the skill ids must be a valid UUID',
  })
  in?: string[];
}

class AuthorFilter {
  @ApiPropertyOptional({
    description: 'Ids of course authors (separated by commas)',
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsUUID(undefined, {
    each: true,
    message: 'Each of the author ids must be a valid UUID',
  })
  in: string[];
}

class LevelFilter {
  @ApiPropertyOptional({
    description: 'Course levels (separated by commas)',
    enum: CourseLevelEnum,
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsEnum(CourseLevelEnum, {
    each: true,
    message: 'Each of the course levels must be a valid enum',
  })
  in?: CourseLevelEnum[];
}

class DurationFilter {
  @ApiPropertyOptional({
    description: 'Min course duration',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Min duration must be a number' })
  @IsPositive({ message: 'Min duration must be positive' })
  min?: number;

  @ApiPropertyOptional({
    description: 'Max course duration',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Max duration must be a number' })
  @IsPositive({ message: 'Max duration must be positive' })
  max?: number;
}

class RatingFilter {
  @ApiPropertyOptional({
    description: 'Min rating',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Min rating must be a number' })
  @IsPositive({ message: 'Min rating must be positive' })
  @Max(5, { message: 'Min rating must be at most 5' })
  min?: number;

  @ApiPropertyOptional({
    description: 'Max rating',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Max rating must be a number' })
  @IsPositive({ message: 'Max rating must be positive' })
  @Max(5, { message: 'Min rating must be at most 5' })
  max?: number;
}

export class QueryCoursesDto extends PageDto {
  @ApiPropertyOptional({
    description: 'Search string',
  })
  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  search?: string;

  @ApiPropertyOptional({
    description: getOrderByFormat(DbCourse),
  })
  @IsOptional()
  @IsString({ message: 'Order by must be a string' })
  @Matches(getOrderByRegex(DbCourse), { message: 'Order by format is invalid' })
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Category filter',
    type: CourseCategoryFilter,
  })
  @IsOptional()
  @Type(() => CourseCategoryFilter)
  @ValidateNested()
  categoryId?: CourseCategoryFilter;

  @ApiPropertyOptional({
    description: 'Skill filter',
    type: SkillFilter,
  })
  @IsOptional()
  @Type(() => SkillFilter)
  @ValidateNested()
  skillId?: SkillFilter;

  @ApiPropertyOptional({
    description: 'Author filter',
    type: AuthorFilter,
  })
  @IsOptional()
  @Type(() => AuthorFilter)
  @ValidateNested()
  authorId?: AuthorFilter;

  @ApiPropertyOptional({
    description: 'Course level filter',
    type: LevelFilter,
  })
  @IsOptional()
  @Type(() => LevelFilter)
  @ValidateNested()
  level?: LevelFilter;

  @ApiPropertyOptional({
    description: 'Duration filter',
    type: DurationFilter,
  })
  @IsOptional()
  @Type(() => DurationFilter)
  @ValidateNested()
  duration?: DurationFilter;

  @ApiPropertyOptional({
    description: 'Rating filter',
    type: RatingFilter,
  })
  @IsOptional()
  @Type(() => RatingFilter)
  @ValidateNested()
  rating?: RatingFilter;
}
