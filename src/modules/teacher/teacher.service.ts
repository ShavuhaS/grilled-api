import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../../database/repositories/teacher.repository';
import { UpdateTeacherDto } from 'src/common/dtos/update-teacher.dto';
import { DbTeacher } from '../../database/entities/teacher.entity';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';

@Injectable()
export class TeacherService {
  constructor(private teacherRepository: TeacherRepository) {}


  async update(id: string, dto: UpdateTeacherDto): Promise<DbTeacher> {
    const teacher = await this.teacherRepository.find({ userId: id });

    if (!teacher) {
      throw new InvalidEntityIdException('Teacher');
    }

    return this.teacherRepository.update({ userId: id }, dto);
  }
}
