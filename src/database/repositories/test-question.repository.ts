import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { DbTestQuestion } from '../entities/test-question.entity';

@Injectable()
export class TestQuestionRepository {
  constructor (private prisma: PrismaService) {}

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