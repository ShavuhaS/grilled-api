import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { DbLessonTest } from '../entities/lesson-test.entity';
import { Repository } from '../interfaces/repository.interface';

@Injectable()
export class CourseTestRepository implements Repository<DbLessonTest> {
  constructor (private prisma: PrismaService) {}

  async find (
    where: Prisma.LessonTestWhereUniqueInput,
    include?: Prisma.LessonTestInclude,
  ): Promise<DbLessonTest> {
    return this.prisma.lessonTest.findUnique({
      where,
      include,
    }) as Promise<DbLessonTest>;
  }

  async findOne (
    where: Prisma.LessonTestWhereInput,
    include?: Prisma.LessonTestInclude,
  ): Promise<DbLessonTest> {
    return this.prisma.lessonTest.findFirst({
      where,
      include,
    }) as Promise<DbLessonTest>;
  }

  async findById (id: string, include?: Prisma.LessonTestInclude): Promise<DbLessonTest> {
    return this.find({ id }, include);
  }

  async create (data: Prisma.LessonTestCreateInput): Promise<DbLessonTest> {
    return this.prisma.lessonTest.create({
      data,
    }) as Promise<DbLessonTest>;
  }

  async update (
    where: Prisma.LessonTestWhereUniqueInput,
    data: Prisma.LessonTestUpdateInput,
    include?: Prisma.LessonTestInclude,
  ): Promise<DbLessonTest> {
    return this.prisma.lessonTest.update({
      where,
      data,
      include,
    }) as Promise<DbLessonTest>;
  }

  async updateById (
    id: string,
    data: Prisma.LessonTestUpdateInput,
    include?: Prisma.LessonTestInclude,
  ): Promise<DbLessonTest> {
    return this.update({ id }, data, include);
  }

}
