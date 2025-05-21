import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DbUser } from '../entities/user.entity';
import { Repository } from '../interfaces/repository.interface';

@Injectable()
export class UserRepository implements Repository<DbUser> {
  constructor (private prisma: PrismaService) {}

  async find (
    where: Prisma.UserWhereUniqueInput,
    include?: Prisma.UserInclude,
  ): Promise<DbUser> {
    return this.prisma.user.findUnique({
      where,
      include,
    }) as Promise<DbUser>;
  }

  async findById (id: string, include?: Prisma.UserInclude): Promise<DbUser> {
    return this.find({ id }, include);
  }

  async findOne (
    where: Prisma.UserWhereInput,
    include?: Prisma.UserInclude,
  ): Promise<DbUser> {
    return this.prisma.user.findFirst({
      where,
      include,
    }) as Promise<DbUser>;
  }

  async create (data: Prisma.UserCreateInput): Promise<DbUser> {
    return this.prisma.user.create({
      data,
    }) as Promise<DbUser>;
  }

  async update (
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUncheckedUpdateInput,
  ): Promise<DbUser> {
    return this.prisma.user.update({
      where,
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
