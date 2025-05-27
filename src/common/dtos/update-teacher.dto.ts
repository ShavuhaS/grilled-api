import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTeacherDto {
  @ApiPropertyOptional({
    description: 'Teacher workplace',
  })
  @IsOptional()
  @IsString({ message: 'Workplace must be a string' })
  @MaxLength(100, { message: 'Workplace must be at most 100 characters long' })
  workplace: string;

  @ApiPropertyOptional({
    description: 'Teacher position',
  })
  @IsOptional()
  @IsString({ message: 'Position must be a string' })
  @MaxLength(100, { message: 'Position must be at most 100 characters long' })
  position?: string;

  @ApiPropertyOptional({
    description: 'Teacher about me',
  })
  @IsOptional()
  @IsString({ message: 'About me must be a string' })
  @MaxLength(2000, { message: 'About me must be at most 2000 characters long' })
  aboutMe?: string;
}