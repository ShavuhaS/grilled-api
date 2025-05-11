import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { LessonDto } from './lesson.dto';
import { ArticleLessonDto } from './article-lesson.dto';
import { VideoLessonDto } from './video-lesson.dto';
import { TestLessonDto } from './test-lesson.dto';
import { BaseLessonDto } from './base-lesson.dto';
import { LessonTypeEnum } from '../enums/lesson-type.enum';

@ApiExtraModels(ArticleLessonDto, VideoLessonDto, TestLessonDto)
export class CreateLessonDto {
  @ApiProperty({
    description: 'Lesson data',
    oneOf: [
      { $ref: getSchemaPath(ArticleLessonDto) },
      { $ref: getSchemaPath(VideoLessonDto) },
      { $ref: getSchemaPath(TestLessonDto) },
    ],
  })
  @IsNotEmptyObject({}, { message: 'Lesson must not be empty' })
  @Type(() => BaseLessonDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: ArticleLessonDto, name: LessonTypeEnum.ARTICLE },
        { value: VideoLessonDto, name: LessonTypeEnum.VIDEO },
        { value: TestLessonDto, name: LessonTypeEnum.TEST },
      ],
    },
  })
  @ValidateNested()
    lesson: LessonDto;
}