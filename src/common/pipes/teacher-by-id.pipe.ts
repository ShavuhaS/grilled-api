import { EntityByIdPipe } from './entity-by-id.pipe';
import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../../database/repositories/teacher.repository';

@Injectable()
export class TeacherByIdPipe extends EntityByIdPipe {
  constructor(private teacherRepository: TeacherRepository) {
    super(teacherRepository, 'Teacher');
  }
}