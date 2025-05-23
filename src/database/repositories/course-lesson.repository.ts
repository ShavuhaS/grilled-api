import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { DbCourseLesson } from '../entities/course-lesson.entity';
import { Repository } from '../interfaces/repository.interface';

@Injectable()
export class CourseLessonRepository implements Repository<DbCourseLesson> {
  constructor (private prisma: PrismaService) {}

  async count (where: Prisma.CourseLessonWhereInput): Promise<number> {
    return this.prisma.courseLesson.count({
      where,
    });
  }

  async findById (id: string, include?: Prisma.CourseLessonInclude): Promise<DbCourseLesson> {
    return this.find({ id }, include);
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

  async findOne (
    where: Prisma.CourseLessonWhereInput,
    include?: Prisma.CourseLessonInclude,
  ): Promise<DbCourseLesson> {
    return this.prisma.courseLesson.findFirst({
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

  async updateById (
    id: string,
    data: Prisma.CourseLessonUpdateInput,
    include?: Prisma.CourseLessonInclude,
  ): Promise<DbCourseLesson> {
    return this.update({ id }, data, include);
  }

  async updateMany (
    where: Prisma.CourseLessonWhereInput,
    data: Prisma.CourseLessonUpdateInput,
  ): Promise<{ count: number }> {
    return this.prisma.courseLesson.updateMany({
      where,
      data,
    });
  }

  async delete (
    where: Prisma.CourseLessonWhereUniqueInput,
    include?: Prisma.CourseLessonInclude,
  ): Promise<DbCourseLesson> {
    return this.prisma.courseLesson.delete({
      where,
      include,
    }) as Promise<DbCourseLesson>;
  }
}
