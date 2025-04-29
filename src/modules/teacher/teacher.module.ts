import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherMapperModule } from './mappers/teacher-mapper.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
  imports: [TeacherMapperModule],
})
export class TeacherModule {}
