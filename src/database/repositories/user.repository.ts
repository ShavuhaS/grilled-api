import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbUser } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor (private prisma: PrismaService) {}

  async findById (id: string): Promise<DbUser> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    }) as Promise<DbUser>;
  }

  async findOne (where: Prisma.UserWhereInput): Promise<DbUser> {
    return this.prisma.user.findFirst({
      where,
    }) as Promise<DbUser>;
  }

  async create (data: Prisma.UserCreateInput): Promise<DbUser> {
    return this.prisma.user.create({
      data,
    }) as Promise<DbUser>;
  }

  async delete (where: Prisma.UserWhereUniqueInput): Promise<DbUser> {
    return this.prisma.user.delete({
      where,
    }) as Promise<DbUser>;
  }

  async deleteMany (where: Prisma.UserWhereInput): Promise<{ count: number }> {
    return this.prisma.user.deleteMany({
      where,
    });
  }
}
