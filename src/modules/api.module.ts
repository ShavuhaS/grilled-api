import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { CourseCategoryModule } from './course-category/course-category.module';

@Module({
  imports: [AuthModule, UserModule, TeacherModule, CourseModule, CourseCategoryModule],
  exports: [AuthModule, UserModule, TeacherModule, CourseModule, CourseCategoryModule],
})
export class ApiModule {}
