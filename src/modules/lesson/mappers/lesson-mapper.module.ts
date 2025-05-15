import { Module } from '@nestjs/common';
import { LessonMapper } from './lesson.mapper';
import { LessonResourceMapper } from './lesson-resource.mapper';
import { TestMapperModule } from '../../test/mappers/test-mapper.module';

@Module({
  providers: [LessonMapper, LessonResourceMapper],
  exports: [LessonMapper, LessonResourceMapper],
  imports: [TestMapperModule],
})
export class LessonMapperModule {}
