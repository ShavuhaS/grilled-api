import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { EmailTokenRepository } from './repositories/email-token.repository';
import { CourseRepository } from './repositories/course.repository';
import { CourseCategoryRepository } from './repositories/course-category.repository';
import { CourseModuleRepository } from './repositories/course-module.repository';
import { CourseLessonRepository } from './repositories/course-lesson.repository';
import { CourseTestRepository } from './repositories/course-test.repository';
import { TestQuestionRepository } from './repositories/test-question.repository';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    EmailTokenRepository,
    CourseRepository,
    CourseCategoryRepository,
    CourseModuleRepository,
    CourseLessonRepository,
    CourseTestRepository,
    TestQuestionRepository,
  ],
  exports: [
    UserRepository,
    EmailTokenRepository,
    CourseRepository,
    CourseCategoryRepository,
    CourseModuleRepository,
    CourseLessonRepository,
    CourseTestRepository,
    TestQuestionRepository,
  ],
})
export class PrismaModule {}
