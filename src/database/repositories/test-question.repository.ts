import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbTestQuestion } from '../entities/test-question.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class TestQuestionRepository extends BaseRepository<
  'testQuestion',
  DbTestQuestion
> {
  constructor(private prisma: PrismaService) {
    super(prisma.testQuestion);
  }
}
