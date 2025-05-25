import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';
import { UserStateEnum } from '../enums/user-state.enum';

export class BaseUserResponse {
  @ApiProperty({
    description: 'User id',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'User google account id',
  })
  googleId?: string;

  @ApiPropertyOptional({
    description: "User's avatar",
  })
  avatar?: string;

  @ApiProperty({
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
  })
  name: string;

  @ApiProperty({
    description: 'User last name',
  })
  surname: string;

  @ApiProperty({
    description: 'User role (STUDENT or TEACHER)',
  })
  role: RoleEnum;

  @ApiProperty({
    description: 'User account state (PENDING or CONFIRMED)',
  })
  state: UserStateEnum;

  @ApiProperty({
    description: 'User learning streak (days)',
  })
  learningStreak: number;
}
