import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { DbTestQuestion } from '../entities/test-question.entity';
import { Repository } from '../interfaces/repository.interface';

@Injectable()
export class TestQuestionRepository implements Repository<DbTestQuestion> {
  constructor (private prisma: PrismaService) {}

  async find (
    where: Prisma.TestQuestionWhereUniqueInput,
    include?: Prisma.TestQuestionInclude,
  ): Promise<DbTestQuestion> {
    return this.prisma.testQuestion.findUnique({
      where,
      include,
    }) as Promise<DbTestQuestion>;
  }

  async findById (id: string, include?: Prisma.TestQuestionInclude): Promise<DbTestQuestion> {
    return this.find({ id }, include);
  }

  async create (
    data: Prisma.TestQuestionCreateInput,
    include?: Prisma.TestQuestionInclude,
  ): Promise<DbTestQuestion> {
    return this.prisma.testQuestion.create({
      data,
      include,
    }) as Promise<DbTestQuestion>;
  }

  async update (
    where: Prisma.TestQuestionWhereUniqueInput,
    data: Prisma.TestQuestionUpdateInput,
    include?: Prisma.TestQuestionInclude,
  ): Promise<DbTestQuestion> {
    return this.prisma.testQuestion.update({
      where,
      data,
      include,
    }) as Promise<DbTestQuestion>;
  }
}
