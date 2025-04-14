import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbVerifyEmailToken } from '../entities/verify-email-token.entity';

@Injectable()
export class EmailTokenRepository {
  constructor (private prisma: PrismaService) {}

  async findByUserId (userId: string): Promise<DbVerifyEmailToken> {
    return (await this.prisma.verifyEmailToken.findUnique({
      where: {
        userId,
      },
    })) as DbVerifyEmailToken;
  }

  async create (userId: string): Promise<DbVerifyEmailToken> {
    return (await this.prisma.verifyEmailToken.create({
      data: {
        userId,
      },
    })) as DbVerifyEmailToken;
  }
}
