import { ApiProperty } from '@nestjs/swagger';
import { LessonTypeEnum } from '../enums/lesson-type.enum';

export class BaseLessonResponse {
  @ApiProperty({
    description: 'Course lesson id',
  })
    id: string;

  @ApiProperty({
    description: 'Course lesson name',
  })
    name: string;

  @ApiProperty({
    description: 'Course lesson number (within module)',
  })
    number: number;

  @ApiProperty({
    description: 'Course lesson type (VIDEO, ARTICLE or TEST)',
    enum: LessonTypeEnum,
  })
    type: LessonTypeEnum;

  @ApiProperty({
    description: 'Estimated time to complete the lesson',
  })
    estimatedTime: number;
}
