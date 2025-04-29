import { BaseCourseResponse } from './base-course.response';
import { ApiProperty } from '@nestjs/swagger';
import { BaseCourseModuleResponse } from './base-course-module.response';

export class CourseResponse extends BaseCourseResponse {
  @ApiProperty({
    description: 'Course modules',
    type: [BaseCourseModuleResponse],
  })
    modules: BaseCourseModuleResponse[];
}