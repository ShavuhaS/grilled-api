import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbCourseModule } from '../entities/course-module.entity';

@Injectable()
export class CourseModuleRepository {
  constructor (private prisma: PrismaService) {}

  async findById (id: string, include?: Prisma.CourseModuleInclude): Promise<DbCourseModule> {
    return this.prisma.courseModule.findUnique({
      where: {
        id,
      },
      include,
    }) as Promise<DbCourseModule>;
  }

  async findMany (args: Prisma.CourseModuleFindManyArgs): Promise<DbCourseModule[]> {
    return this.prisma.courseModule.findMany(args) as Promise<DbCourseModule[]>;
  }

  async create (data: Prisma.CourseModuleCreateInput, include?: Prisma.CourseModuleInclude): Promise<DbCourseModule> {
    return this.prisma.courseModule.create({
      data,
      include,
    }) as Promise<DbCourseModule>;
  }

  async updateMany (where: Prisma.CourseModuleWhereInput, data: Prisma.CourseModuleUpdateInput): Promise<{ count: number }> {
    return this.prisma.courseModule.updateMany({
      where,
      data,
    });
  }

  async delete (where: Prisma.CourseModuleWhereUniqueInput): Promise<DbCourseModule> {
    return this.prisma.courseModule.delete({ where }) as Promise<DbCourseModule>;
  }
}