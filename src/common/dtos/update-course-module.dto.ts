import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCourseModuleDto } from './create-course-module.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCourseModuleDto extends PartialType(CreateCourseModuleDto) {
  @ApiPropertyOptional({
    description: 'New module order number (inside a course)',
    type: 'integer',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Order must be a number' })
  @Min(1, { message: 'Order must be positive' })
  order?: number;
}