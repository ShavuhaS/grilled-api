import { ApiProperty } from '@nestjs/swagger';
import { CourseTeacherResponse } from './course-teacher.response';
import { BaseCourseCategoryResponse } from './base-course-category.response';

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