import { BaseRepository } from '../base.repository';
import { DbTeacher } from '../entities/teacher.entity';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherRepository extends BaseRepository<'teacher', DbTeacher> {
  constructor(private prisma: PrismaService) {
    super(prisma.teacher);
  }
}
