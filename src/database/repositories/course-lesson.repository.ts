import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbCourseLesson } from '../entities/course-lesson.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class CourseLessonRepository extends BaseRepository<
  'courseLesson',
  DbCourseLesson
> {
  constructor(private prisma: PrismaService) {
    super(prisma.courseLesson);
  }
}
