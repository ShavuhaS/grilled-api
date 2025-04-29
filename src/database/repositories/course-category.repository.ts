import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbCourseCategory } from '../entities/course-category.entity';

@Injectable()
export class CourseCategoryRepository {
  constructor (private prisma: PrismaService) {}

  async findById (id: string, include?: Prisma.CourseCategoryInclude): Promise<DbCourseCategory> {
    return this.prisma.courseCategory.findUnique({
      where: {
        id,
      },
      include,
    }) as Promise<DbCourseCategory>;
  }

  async findMany (where: Prisma.CourseCategoryWhereInput, include?: Prisma.CourseCategoryInclude): Promise<DbCourseCategory[]> {
    return this.prisma.courseCategory.findMany({
      where,
      include,
    }) as Promise<DbCourseCategory[]>;
  }
}