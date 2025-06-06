import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseUserResponse } from './base-user.response';
import { BaseTeacherResponse } from './base-teacher.response';

export class UserResponse extends BaseUserResponse {
  @ApiPropertyOptional({
    description: "Teacher's bio information",
  })
  teacher?: BaseTeacherResponse;
}
