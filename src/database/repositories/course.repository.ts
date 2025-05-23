import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbCourse } from '../entities/course.entity';
import { Repository } from '../interfaces/repository.interface';

@Injectable()
export class CourseRepository implements Repository<DbCourse> {
  private include: Prisma.CourseInclude = {
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
  };

  constructor (private prisma: PrismaService) {}

  async findById (
    id: string,
    include?: Prisma.CourseInclude,
  ): Promise<DbCourse> {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        ...this.include,
        ...include,
      },
    }) as Promise<DbCourse>;
  }

  async findOne (
    where: Prisma.CourseWhereInput,
    include?: Prisma.CourseInclude,
  ): Promise<DbCourse> {
    return this.prisma.course.findFirst({
      where,
      include: {
        ...this.include,
        ...include,
      },
    }) as Promise<DbCourse>;
  }

  async findMany (
    where: Prisma.CourseWhereInput,
    include?: Prisma.CourseInclude,
  ): Promise<DbCourse[]> {
    return this.prisma.course.findMany({
      where,
      include,
    }) as Promise<DbCourse[]>;
  }

  async update (
    where: Prisma.CourseWhereUniqueInput,
    data: Prisma.CourseUpdateInput,
  ): Promise<DbCourse> {
    return this.prisma.course.update({ where, data }) as Promise<DbCourse>;
  }

  async updateById (
    id: string,
    data: Prisma.CourseUpdateInput,
  ): Promise<DbCourse> {
    return this.update({ id }, data);
  }

  async create (
    dto: Prisma.CourseUncheckedCreateInput,
    include?: Prisma.CourseInclude,
  ): Promise<DbCourse> {
    return this.prisma.course.create({
      data: dto,
      include: {
        ...this.include,
        ...include,
      },
    }) as Promise<DbCourse>;
  }
}
