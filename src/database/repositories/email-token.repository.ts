import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbVerifyEmailToken } from '../entities/verify-email-token.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmailTokenRepository {
  constructor (private prisma: PrismaService) {}

  async findByUserId (
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

  async find (
    token: string,
    include?: Prisma.VerifyEmailTokenInclude,
  ): Promise<DbVerifyEmailToken> {
    return this.prisma.verifyEmailToken.findUnique({
      where: {
        token,
      },
      include,
    }) as Promise<DbVerifyEmailToken>;
  }

  async create (userId: string): Promise<DbVerifyEmailToken> {
    return this.prisma.verifyEmailToken.create({
      data: {
        userId,
      },
    }) as Promise<DbVerifyEmailToken>;
  }

  async delete (
    where: Prisma.VerifyEmailTokenWhereUniqueInput,
  ): Promise<DbVerifyEmailToken> {
    return this.prisma.verifyEmailToken.delete({
      where,
    }) as Promise<DbVerifyEmailToken>;
  }
}
