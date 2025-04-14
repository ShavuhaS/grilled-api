import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { EmailTokenRepository } from './repositories/email-token.repository';

@Module({
  providers: [PrismaService, UserRepository, EmailTokenRepository],
  exports: [UserRepository, EmailTokenRepository],
})
export class PrismaModule {}
