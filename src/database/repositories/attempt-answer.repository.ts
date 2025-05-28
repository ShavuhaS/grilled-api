import { BaseRepository } from '../base.repository';
import { DbTestAttemptAnswer } from '../entities/test-attempt-answer.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AttemptAnswerRepository extends BaseRepository<
  'testAttemptAnswer',
  DbTestAttemptAnswer
> {
  constructor(private prisma: PrismaService) {
    super(prisma.testAttemptAnswer, { testQuestion: true, choices: true });
  }
}
