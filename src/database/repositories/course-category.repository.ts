import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbCourseCategory } from '../entities/course-category.entity';
import { Repository } from '../interfaces/repository.interface';

@Injectable()
export class CourseCategoryRepository implements Repository<DbCourseCategory> {
  constructor (private prisma: PrismaService) {}

  async findById (
    id: string,
    include?: Prisma.CourseCategoryInclude,
  ): Promise<DbCourseCategory> {
    return this.find({ id }, include);
  }

  async find (
    where: Prisma.CourseCategoryWhereUniqueInput,
    include?: Prisma.CourseCategoryInclude,
  ): Promise<DbCourseCategory> {
    return this.prisma.courseCategory.findUnique({
      where,
      include,
    }) as Promise<DbCourseCategory>;
  }

  async findMany (
    where: Prisma.CourseCategoryWhereInput,
    include?: Prisma.CourseCategoryInclude,
  ): Promise<DbCourseCategory[]> {
    return this.prisma.courseCategory.findMany({
      where,
      include,
    }) as Promise<DbCourseCategory[]>;
  }
}
