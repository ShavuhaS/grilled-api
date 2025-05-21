import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbCourseModule } from '../entities/course-module.entity';
import { Repository } from '../interfaces/repository.interface';

@Injectable()
export class CourseModuleRepository implements Repository<DbCourseModule> {
  constructor (private prisma: PrismaService) {}

  async find (
    where: Prisma.CourseModuleWhereUniqueInput,
    include?: Prisma.CourseModuleInclude,
  ): Promise<DbCourseModule> {
    return this.prisma.courseModule.findUnique({
      where,
      include,
    }) as Promise<DbCourseModule>;
  }

  async findOne (
    where: Prisma.CourseModuleWhereInput,
    include?: Prisma.CourseModuleInclude,
  ): Promise<DbCourseModule> {
    return this.prisma.courseModule.findFirst({
      where,
      include,
    }) as Promise<DbCourseModule>;
  }

  async findById (
    id: string,
    include?: Prisma.CourseModuleInclude,
  ): Promise<DbCourseModule> {
    return this.find({ id }, include);
  }

  async findMany (
    args: Prisma.CourseModuleFindManyArgs,
  ): Promise<DbCourseModule[]> {
    return this.prisma.courseModule.findMany(args) as Promise<DbCourseModule[]>;
  }

  async create (
    data: Prisma.CourseModuleCreateInput,
    include?: Prisma.CourseModuleInclude,
  ): Promise<DbCourseModule> {
    return this.prisma.courseModule.create({
      data,
      include,
    }) as Promise<DbCourseModule>;
  }

  async update (
    where: Prisma.CourseModuleWhereUniqueInput,
    data: Prisma.CourseModuleUpdateInput,
  ): Promise<DbCourseModule> {
    return this.prisma.courseModule.update({
      where,
      data,
    }) as Promise<DbCourseModule>;
  }

  async updateMany (
    where: Prisma.CourseModuleWhereInput,
    data: Prisma.CourseModuleUpdateInput,
  ): Promise<{ count: number }> {
    return this.prisma.courseModule.updateMany({
      where,
      data,
    });
  }

  async delete (
    where: Prisma.CourseModuleWhereUniqueInput,
  ): Promise<DbCourseModule> {
    return this.prisma.courseModule.delete({
      where,
    }) as Promise<DbCourseModule>;
  }
}
