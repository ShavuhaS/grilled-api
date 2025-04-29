import { Module } from '@nestjs/common';
import { CourseMapper } from './course.mapper';
import { TeacherMapperModule } from '../../teacher/mappers/teacher-mapper.module';
import { CourseCategoryMapperModule } from '../../course-category/mappers/course-category-mapper.module';
import { CourseModuleMapper } from './course-module.mapper';
import { CourseLessonMapper } from './course-lesson.mapper';

@Module({
  providers: [CourseMapper, CourseModuleMapper, CourseLessonMapper],
  exports: [CourseMapper, CourseModuleMapper, CourseLessonMapper],
  imports: [TeacherMapperModule, CourseCategoryMapperModule],
})
export class CourseMapperModule {}