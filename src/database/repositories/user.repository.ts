import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbUser } from '../entities/user.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class UserRepository extends BaseRepository<'user', DbUser> {
  constructor(private prisma: PrismaService) {
    super(prisma.user);
  }
}
