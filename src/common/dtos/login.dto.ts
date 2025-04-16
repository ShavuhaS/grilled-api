import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
  })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Email should be a valid email' })
    email: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Password should be a string' })
    password: string;
}