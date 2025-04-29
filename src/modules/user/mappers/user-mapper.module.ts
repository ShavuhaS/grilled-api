import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { TeacherMapperModule } from '../../teacher/mappers/teacher-mapper.module';

@Module({
  providers: [UserMapper],
  exports: [UserMapper],
  imports: [TeacherMapperModule],
})
export class UserMapperModule {}