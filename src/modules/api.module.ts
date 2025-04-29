import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [AuthModule, UserModule, TeacherModule, CourseModule],
  exports: [AuthModule, UserModule, TeacherModule],
})
export class ApiModule {}
