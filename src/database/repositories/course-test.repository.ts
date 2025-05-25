import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbLessonTest } from '../entities/lesson-test.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class CourseTestRepository extends BaseRepository<
  'lessonTest',
  DbLessonTest
> {
  constructor(private prisma: PrismaService) {
    super(prisma.lessonTest);
  }
}
