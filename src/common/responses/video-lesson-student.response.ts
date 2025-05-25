import { LessonResponse } from './lesson.response';
import { ApiProperty } from '@nestjs/swagger';

export class VideoLessonStudentResponse extends LessonResponse {
  @ApiProperty({
    description: 'Lesson video link',
  })
  videoLink?: string;
}
