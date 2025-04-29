import { Injectable } from '@nestjs/common';
import { DbTeacher } from '../../../database/entities/teacher.entity';
import { BaseTeacherResponse } from '../../../common/responses/base-teacher.response';
import { CourseTeacherResponse } from '../../../common/responses/course-teacher.response';

@Injectable()
export class TeacherMapper {
  constructor () {}

  toBaseTeacherResponse (teacher: DbTeacher): BaseTeacherResponse {
    return {
      avatar: teacher.avatar,
      workplace: teacher.workplace,
      position: teacher.position,
      aboutMe: teacher.aboutMe,
    };
  }

  toCourseTeacherResponse (teacher: DbTeacher): CourseTeacherResponse {
    return {
      id: teacher.userId,
      avatar: teacher.avatar,
      name: teacher?.user.name,
      surname: teacher?.user.surname,
      workplace: teacher.workplace,
    };
  }
}