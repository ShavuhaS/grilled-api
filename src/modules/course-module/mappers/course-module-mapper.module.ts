import { Module } from '@nestjs/common';
import { CourseModuleMapper } from './course-module.mapper';
import { LessonMapperModule } from '../../lesson/mappers/lesson-mapper.module';

@Module({
  providers: [CourseModuleMapper],
  exports: [CourseModuleMapper],
  imports: [LessonMapperModule],
})
export class CourseModuleMapperModule {}