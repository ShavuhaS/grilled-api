import { ApiProperty } from '@nestjs/swagger';

export class LessonLinkResponse {
  @ApiProperty({
    description: 'Lesson link id',
  })
  id: string;

  @ApiProperty({
    description: 'Lesson link name',
  })
  name: string;

  @ApiProperty({
    description: 'Lesson link url',
  })
  url: string;
}
