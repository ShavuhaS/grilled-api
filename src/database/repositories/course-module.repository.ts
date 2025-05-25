import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbCourseModule } from '../entities/course-module.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class CourseModuleRepository extends BaseRepository<
  'courseModule',
  DbCourseModule
> {
  constructor(private prisma: PrismaService) {
    super(prisma.courseModule);
  }
}
