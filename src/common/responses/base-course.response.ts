import { ApiProperty } from '@nestjs/swagger';
import { CourseTeacherResponse } from './course-teacher.response';
import { BaseCourseCategoryResponse } from './base-course-category.response';
import { CourseLevelEnum } from '../enums/course-level.enum';
import { CourseStatusEnum } from '../enums/course-status.enum';

export class BaseCourseResponse {
  @ApiProperty({
    description: 'Course id',
  })
  id: string;

  @ApiProperty({
    description: 'Course author',
    type: CourseTeacherResponse,
  })
  author: CourseTeacherResponse;

  @ApiProperty({
    description: 'Course category',
    type: BaseCourseCategoryResponse,
  })
  category: BaseCourseCategoryResponse;

  @ApiProperty({
    description: 'Course name',
  })
  name: string;

  @ApiProperty({
    description: 'Course description',
  })
  about: string;

  @ApiProperty({
    description: 'Course avatar link',
  })
  avatarLink: string;

  @ApiProperty({
    description: 'Course level (BEGINNER, INTERMEDIATE or EXPERT)',
    enum: CourseLevelEnum,
  })
  level: CourseLevelEnum;

  @ApiProperty({
    description: 'Course status (DRAFT, ARCHIVED or PUBLISHED)',
    enum: CourseStatusEnum,
  })
  status: CourseStatusEnum;

  @ApiProperty({
    description: 'Estimated time for course completion',
  })
  estimatedTime: number;

  @ApiProperty({
    description: 'Number of students enrolled onto a course',
  })
  enrolledCount: number;

  @ApiProperty({
    description: 'Course rating',
  })
  rating: number;
}
