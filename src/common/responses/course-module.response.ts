import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseLessonResponse } from './base-lesson.response';
import { BaseCourseModuleResponse } from './base-course-module.response';

export class CourseModuleResponse extends BaseCourseModuleResponse {
  @ApiProperty({
    description: 'Course module lessons (with links if the user owns the course or enrolled onto it)',
    type: [BaseLessonResponse],
  })
    lessons: BaseLessonResponse[];

  @ApiPropertyOptional({
    description: 'Module progress (if the user is enrolled)',
  })
    progress?: number;
}
