import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseModuleDto {
  @ApiProperty({
    description: 'Module name',
  })
  @IsNotEmpty({ message: 'Module name must not be empty' })
  @IsString({ message: 'Module name must be a string' })
  @MinLength(5, { message: 'Module name must be at least 5 characters long' })
  @MaxLength(30, { message: 'Module name must be at most 30 characters long' })
    name: string;
}
