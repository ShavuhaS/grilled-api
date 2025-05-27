import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CourseCategoryFilter, SkillFilter } from './query-courses.dto';
import {
  getSortFormatByKeys,
  getSortRegexByKeys,
} from '../utils/get-order-by-regex.util';
import { PageDto } from './page.dto';
import { UserCourseStatus } from '../enums/user-course-status.enum';

export class UserCourseStatusFilter {
  @ApiPropertyOptional({
    description: 'User course statuses (separated by commas)',
    enum: UserCourseStatus,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsEnum(UserCourseStatus, {
    each: true,
    message: 'Each of the statuses must be a valid enum',
  })
  in?: UserCourseStatus[];
}

const orderByKeys = ['name', 'lastProgressAt'];

export class QueryUserCoursesDto extends PageDto {
  @ApiPropertyOptional({
    description: 'Search string',
  })
  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  search?: string;

  @ApiPropertyOptional({
    description: getSortFormatByKeys(orderByKeys),
  })
  @IsOptional()
  @IsString({ message: 'Order by must be a string' })
  @Matches(getSortRegexByKeys(orderByKeys), {
    message: 'Order by format is invalid',
  })
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
    description: 'User course status filter',
    type: UserCourseStatusFilter,
  })
  @IsOptional()
  @Type(() => UserCourseStatusFilter)
  @ValidateNested()
  status?: UserCourseStatusFilter;
}
