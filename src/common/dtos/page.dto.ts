import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PageDto {
  @ApiPropertyOptional({
    description: 'Page number (1 by default)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be positive' })
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of elements on the page (20 by default)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Page size must be a number' })
  @Min(1, { message: 'Page size must be positive' })
  pageSize: number = 20;
}
