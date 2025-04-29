import { Module } from '@nestjs/common';
import { CourseMapper } from './course.mapper';
import { TeacherMapperModule } from '../../teacher/mappers/teacher-mapper.module';
import { CourseCategoryMapperModule } from '../../course-category/mappers/course-category-mapper.module';

@Module({
  providers: [CourseMapper],
  exports: [CourseMapper],
  imports: [TeacherMapperModule, CourseCategoryMapperModule],
})
export class CourseMapperModule {}