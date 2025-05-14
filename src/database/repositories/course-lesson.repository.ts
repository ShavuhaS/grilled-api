import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { DbCourseLesson } from '../entities/course-lesson.entity';

@Injectable()
export class CourseLessonRepository {
  constructor (private prisma: PrismaService) {}

  async count (where: Prisma.CourseLessonWhereInput): Promise<number> {
    return this.prisma.courseLesson.count({
      where,
    });
  }

  async find (
    where: Prisma.CourseLessonWhereUniqueInput,
    include?: Prisma.CourseLessonInclude,
  ): Promise<DbCourseLesson> {
    return this.prisma.courseLesson.findUnique({
      where,
      include,
    }) as Promise<DbCourseLesson>;
  }

  async findMany (
    where: Prisma.CourseLessonWhereInput,
    include?: Prisma.CourseLessonInclude,
  ): Promise<DbCourseLesson[]> {
    return this.prisma.courseLesson.findMany({
      where,
      include,
    }) as Promise<DbCourseLesson[]>;
  }

  async create (
    data: Prisma.CourseLessonCreateInput,
    include?: Prisma.CourseLessonInclude,
  ): Promise<DbCourseLesson> {
    return this.prisma.courseLesson.create({
      data,
      include,
    }) as Promise<DbCourseLesson>;
  }

  async update (
    where: Prisma.CourseLessonWhereUniqueInput,
    data: Prisma.CourseLessonUpdateInput,
    include?: Prisma.CourseLessonInclude,
  ): Promise<DbCourseLesson> {
    return this.prisma.courseLesson.update({
      where,
      data,
      include,
    }) as Promise<DbCourseLesson>;
  }
}
