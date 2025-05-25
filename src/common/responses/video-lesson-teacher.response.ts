import { LessonBaseTeacherResponse } from './lesson-base-teacher.response';
import { ApiProperty } from '@nestjs/swagger';

export class VideoLessonTeacherResponse extends LessonBaseTeacherResponse {
  @ApiProperty({
    description: 'Video link (signed URL)',
  })
  videoLink: string;
}
