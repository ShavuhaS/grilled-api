import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { RoleEnum } from '../enums/role.enum';

export class RegistrationDto {
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
  @Matches(
    new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,64}/,
    ),
    {
      message:
        'Password should contain at least one lowercase letter, ' +
        'one uppercase letter, one digit, one special character, ' +
        'having from 8 to 64 characters in total',
    },
  )
  password: string;

  @ApiProperty({
    description: 'User first name',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  @MaxLength(40, { message: 'Name should be at most 40 characters long' })
  name: string;

  @ApiProperty({
    description: 'User first name',
  })
  @IsNotEmpty({ message: 'Surname should not be empty' })
  @IsString({ message: 'Surname should be a string' })
  @MinLength(3, { message: 'Surname should be at least 3 characters long' })
  @MaxLength(40, { message: 'Surname should be at most 40 characters long' })
  surname: string;

  @ApiProperty({
    description: 'User role (STUDENT or TEACHER)',
    enum: [RoleEnum.STUDENT, RoleEnum.TEACHER],
  })
  @IsNotEmpty({ message: 'Role should not be empty' })
  @IsEnum([RoleEnum.STUDENT, RoleEnum.TEACHER], {
    message: 'Role should be either STUDENT, or TEACHER',
  })
  role: RoleEnum;
}
