import { LessonResponse } from './lesson.response';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleLessonStudentResponse extends LessonResponse {
  @ApiProperty({
    description: 'Lesson article link',
  })
    articleLink?: string;
}