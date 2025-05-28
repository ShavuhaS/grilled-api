import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherMapperModule } from './mappers/teacher-mapper.module';
import { PrismaModule } from '../../database/prisma.module';
import { CourseMapperModule } from '../course/mappers/course-mapper.module';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
  imports: [CourseModule, TeacherMapperModule, CourseMapperModule, PrismaModule],
})
export class TeacherModule {}
