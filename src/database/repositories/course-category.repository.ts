import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbCourseCategory } from '../entities/course-category.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class CourseCategoryRepository extends BaseRepository<
  'courseCategory',
  DbCourseCategory
> {
  constructor(private prisma: PrismaService) {
    super(prisma.courseCategory);
  }
}
