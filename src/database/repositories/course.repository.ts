import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbCourse } from '../entities/course.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class CourseRepository extends BaseRepository<'course', DbCourse> {
  constructor(private prisma: PrismaService) {
    super(prisma.course, {
      author: {
        include: {
          user: {
            include: {
              teacher: true,
            },
          },
        },
      },
      category: true,
    });
  }
}
