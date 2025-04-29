import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { EmailTokenRepository } from './repositories/email-token.repository';
import { CourseRepository } from './repositories/course.repository';
import { CourseCategoryRepository } from './repositories/course-category.repository';

@Module({
  providers: [PrismaService, UserRepository, EmailTokenRepository, CourseRepository, CourseCategoryRepository],
  exports: [UserRepository, EmailTokenRepository, CourseRepository, CourseCategoryRepository],
})
export class PrismaModule {}
