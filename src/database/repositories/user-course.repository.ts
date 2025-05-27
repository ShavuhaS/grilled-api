import { BaseRepository } from '../base.repository';
import { DbUserCourse } from '../entities/user-course.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserCourseRepository extends BaseRepository<
  'userCourse',
  DbUserCourse
> {
  constructor(private prisma: PrismaService) {
    super(prisma.userCourse);
  }
}
