import { ApiProperty } from '@nestjs/swagger';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
import { BaseLessonDto } from './base-lesson.dto';
import { IsOptional } from 'class-validator';

export class VideoLessonDto extends BaseLessonDto {
  @ApiProperty({
    description: 'Lesson type (VIDEO)',
    enum: [LessonTypeEnum.VIDEO],
  })
  type: LessonTypeEnum.VIDEO;

  @IsOptional()
  estimatedTime?: number;
}
