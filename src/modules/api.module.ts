import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { CourseCategoryModule } from './course-category/course-category.module';
import { LessonModule } from './lesson/lesson.module';
import { TestModule } from './test/test.module';
import { CourseModuleModule } from './course-module/course-module.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TeacherModule,
    CourseModule,
    CourseCategoryModule,
    LessonModule,
    TestModule,
    CourseModuleModule,
  ],
  exports: [
    AuthModule,
    UserModule,
    TeacherModule,
    CourseModule,
    CourseCategoryModule,
  ],
})
export class ApiModule {}
