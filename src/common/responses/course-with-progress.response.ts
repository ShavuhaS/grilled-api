import { BaseCourseResponse } from './base-course.response';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CourseWithProgressResponse extends BaseCourseResponse {
  @ApiPropertyOptional({
    description:
      'Course progress (in percents), returned if the user is enrolled',
    example: '76.3',
  })
  progress?: number;
}
