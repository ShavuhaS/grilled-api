import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseLessonResponse } from './base-lesson.response';
import { LessonLinkResponse } from './lesson-link.response';

export class LessonResponse extends BaseLessonResponse {
  @ApiPropertyOptional({
    description: 'Lesson links',
  })
    links?: LessonLinkResponse[];

  @ApiPropertyOptional({
    description: 'Is lesson completed',
  })
    completed?: boolean;
}