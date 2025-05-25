import { BaseCourseResponse } from './base-course.response';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseModuleResponse } from './course-module.response';

export class CourseResponse extends BaseCourseResponse {
  @ApiProperty({
    description: 'Course modules',
    type: [CourseModuleResponse],
  })
  modules: CourseModuleResponse[];

  @ApiPropertyOptional({
    description:
      'Course progress (in percents), returned if the user is enrolled',
    example: '76.3',
  })
  progress?: number;
}
