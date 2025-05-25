import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbVerifyEmailToken } from '../entities/verify-email-token.entity';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../base.repository';

@Injectable()
export class EmailTokenRepository extends BaseRepository<
  'verifyEmailToken',
  DbVerifyEmailToken
> {
  constructor(private prisma: PrismaService) {
    super(prisma.verifyEmailToken);
  }

  async findByUserId(
    userId: string,
    include?: Prisma.VerifyEmailTokenInclude,
  ): Promise<DbVerifyEmailToken> {
    return this.prisma.verifyEmailToken.findUnique({
      where: {
        userId,
      },
      include,
    }) as Promise<DbVerifyEmailToken>;
  }
}
