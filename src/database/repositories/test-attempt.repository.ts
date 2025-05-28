import { BaseRepository } from '../base.repository';
import { DbTestAttempt } from '../entities/test-attempt.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TestAttemptRepository extends BaseRepository<
  'testAttempt',
  DbTestAttempt
> {
  constructor(private prisma: PrismaService) {
    super(prisma.testAttempt, {
      answers: { include: { choices: true, testQuestion: true } },
    });
  }
}
