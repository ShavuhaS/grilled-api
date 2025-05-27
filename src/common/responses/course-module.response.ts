import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCourseModuleResponse } from './base-course-module.response';
import { LessonResponse } from './lesson.response';

export class CourseModuleResponse extends BaseCourseModuleResponse {
  @ApiProperty({
    description:
      'Course module lessons (with links if the user owns the course or enrolled onto it)',
    type: [LessonResponse],
  })
  lessons: LessonResponse[];

  @ApiPropertyOptional({
    description: 'Module progress (if the user is enrolled)',
  })
  progress?: number;
}
