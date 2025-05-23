import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { BaseLessonDto } from './base-lesson.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { LessonTypeEnum } from '../enums/lesson-type.enum';

const baseDtoFields: (keyof BaseLessonDto)[] = ['name', 'estimatedTime', 'type'] as const;

export class UpdateLessonDto extends PartialType(PickType(BaseLessonDto, baseDtoFields)) implements IUpdateLessonDto {
  @ApiPropertyOptional({
    description: 'New lesson name',
  })
    name?: string;

  @ApiPropertyOptional({
    description: 'New estimated time (if the lesson is not VIDEO)',
  })
    estimatedTime?: number;

  @ApiPropertyOptional({
    description: 'New lesson type',
    enum: LessonTypeEnum,
  })
    type?: LessonTypeEnum;

  @ApiPropertyOptional({
    description: 'New lesson order number (inside a module)',
    type: 'integer',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Order must be a number' })
  @Min(1, { message: 'Order must be positive' })
    order?: number;
}

export interface IUpdateLessonDto {
  name?: string;
  estimatedTime?: number;
  order?: number;
  type?: LessonTypeEnum;
}
