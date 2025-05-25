import { BaseLessonResponse } from './base-lesson.response';
import { ApiProperty } from '@nestjs/swagger';
import { LessonLinkResponse } from './lesson-link.response';

export class LessonBaseTeacherResponse extends BaseLessonResponse {
  @ApiProperty({
    description: 'Lesson links',
  })
  links: LessonLinkResponse[];
}
