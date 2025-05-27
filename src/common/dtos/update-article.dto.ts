import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateArticleDto {
  @ApiProperty({
    description: 'New article content',
  })
  @IsNotEmpty({ message: 'Article must not be empty' })
  @IsString({ message: 'Article must be a string' })
  @MinLength(50, { message: 'Article must be at least 50 characters long' })
  @MaxLength(10000, { message: 'Article must be at most 10000 characters long' })
  text: string;
}
