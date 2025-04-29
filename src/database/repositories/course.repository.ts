import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbCourse } from '../entities/course.entity';

@Injectable()
export class CourseRepository {
  constructor (private prisma: PrismaService) {}

  async findById (id: string, include?: Prisma.CourseInclude): Promise<DbCourse> {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
      include,
    }) as Promise<DbCourse>;
  }

  async updateById (id: string, data: Prisma.CourseUpdateInput): Promise<DbCourse> {
    return this.prisma.course.update({
      where: {
        id,
      },
      data,
    }) as Promise<DbCourse>;
  }

  async create (dto: Prisma.CourseUncheckedCreateInput, include?: Prisma.CourseInclude): Promise<DbCourse> {
    return this.prisma.course.create({
      data: dto,
      include,
    }) as Promise<DbCourse>;
  }
}