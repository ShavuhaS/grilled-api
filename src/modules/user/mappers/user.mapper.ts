import { Injectable } from '@nestjs/common';
import { TeacherMapper } from '../../teacher/mappers/teacher.mapper';
import { DbUser } from '../../../database/entities/user.entity';
import { BaseUserResponse } from '../../../common/responses/base-user.response';
import { UserResponse } from '../../../common/responses/user.response';

@Injectable()
export class UserMapper {
  constructor (private teacherMapper: TeacherMapper) {}

  toBaseUserResponse (user: DbUser): BaseUserResponse {
    return {
      id: user.id,
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      surname: user.surname,
      state: user.state,
      role: user.role,
      learningStreak: user.learningStreak,
    };
  }

  toUserResponse (user: DbUser): UserResponse {
    return {
      ...this.toBaseUserResponse(user),
      teacher: user.teacher ? this.teacherMapper.toBaseTeacherResponse(user.teacher) : undefined,
    };
  }
}