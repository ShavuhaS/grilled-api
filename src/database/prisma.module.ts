import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { EmailTokenRepository } from './repositories/email-token.repository';
import { CourseRepository } from './repositories/course.repository';

@Module({
  providers: [PrismaService, UserRepository, EmailTokenRepository, CourseRepository],
  exports: [UserRepository, EmailTokenRepository, CourseRepository],
})
export class PrismaModule {}
