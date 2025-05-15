import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { DbLessonTest } from '../entities/lesson-test.entity';

@Injectable()
export class CourseTestRepository {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.LessonTestCreateInput): Promise<DbLessonTest> {
    return this.prisma.lessonTest.create({
      data,
    }) as Promise<DbLessonTest>;
  }
}
