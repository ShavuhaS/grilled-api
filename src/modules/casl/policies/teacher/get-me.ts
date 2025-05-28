import { TeacherBaseMePolicy } from './base-me';
import { TeacherRepository } from '../../../../database/repositories/teacher.repository';
import { TeacherAction } from '../../../../common/enums/teacher-action.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherGetMePolicy extends TeacherBaseMePolicy {
  constructor(private teacherRepository: TeacherRepository) {
    super(teacherRepository, TeacherAction.READ);
  }
}
