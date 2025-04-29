import { Module } from '@nestjs/common';
import { TeacherMapper } from './teacher.mapper';

@Module({
  providers: [TeacherMapper],
  exports: [TeacherMapper],
})
export class TeacherMapperModule {}