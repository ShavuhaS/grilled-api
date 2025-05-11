import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class LessonLinkDto {
  @ApiProperty({
    description: 'Lesson link name (description)',
  })
  @IsNotEmpty({ message: 'Link name must not be empty' })
  @IsString({ message: 'Link name must be a string' })
  @MinLength(3, { message: 'Link name must be at least 3 characters long' })
  @MaxLength(20, { message: 'Link name must be at most 20 characters long' })
    name: string;

  @ApiProperty({
    description: 'Lesson link',
  })
  @IsNotEmpty({ message: 'Link must not be empty' })
  @IsString({ message: 'Link must be a string' })
  @IsUrl({}, { message: 'Link must be a valid URL' })
    link: string;
}