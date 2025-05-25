import { LessonBaseTeacherResponse } from './lesson-base-teacher.response';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleLessonTeacherResponse extends LessonBaseTeacherResponse {
  @ApiProperty({
    description: 'Article link (signed URL to html markup)',
  })
  articleLink: string;
}
