import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { getSortFormat, getSortRegex } from '../utils/get-order-by-regex.util';
import { PageDto } from './page.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { CourseStatusEnum } from '../enums/course-status.enum';

export class CourseStatusFilter {
  @ApiPropertyOptional({
    description: 'Course statuses (separated by commas)',
    enum: CourseStatusEnum,
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsEnum(CourseStatusEnum, {
    each: true,
    message: 'Each of the course statuses must be a valid enum',
  })
  in?: CourseStatusEnum[];
}

export class QueryTeacherCoursesDto extends PageDto {
  @ApiPropertyOptional({
    description: 'Search string',
  })
  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  search?: string;

  @ApiPropertyOptional({
    description: getSortFormat(DbCourse),
  })
  @IsOptional()
  @IsString({ message: 'Order by must be a string' })
  @Matches(getSortRegex(DbCourse), {
    message: 'Order by format is invalid',
  })
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Course status filter',
    type: CourseStatusFilter,
  })
  @IsOptional()
  @Type(() => CourseStatusFilter)
  @ValidateNested()
  status?: CourseStatusFilter;
}
