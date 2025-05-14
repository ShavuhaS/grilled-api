import { ApiProperty } from '@nestjs/swagger';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
import { BaseLessonDto } from './base-lesson.dto';

export class VideoLessonDto extends BaseLessonDto {
  @ApiProperty({
    description: 'Lesson type (VIDEO)',
    enum: [LessonTypeEnum.VIDEO],
  })
    type: LessonTypeEnum.VIDEO;
}
