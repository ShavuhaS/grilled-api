import { ApiProperty } from '@nestjs/swagger';
import { CourseModuleResponse } from './course-module.response';
import { CourseWithProgressResponse } from './course-with-progress.response';

export class CourseResponse extends CourseWithProgressResponse {
  @ApiProperty({
    description: 'Course modules',
    type: [CourseModuleResponse],
  })
  modules: CourseModuleResponse[];
}
