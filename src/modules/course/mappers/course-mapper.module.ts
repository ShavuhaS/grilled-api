import { Module } from '@nestjs/common';
import { CourseMapper } from './course.mapper';
import { TeacherMapperModule } from '../../teacher/mappers/teacher-mapper.module';
import { CourseCategoryMapperModule } from '../../course-category/mappers/course-category-mapper.module';
import { CourseModuleMapperModule } from '../../course-module/mappers/course-module-mapper.module';
import { SkillMapperModule } from '../../skill/mappers/skill-mapper.module';

@Module({
  providers: [CourseMapper],
  exports: [CourseMapper],
  imports: [
    TeacherMapperModule,
    CourseCategoryMapperModule,
    SkillMapperModule,
    CourseModuleMapperModule,
  ],
})
export class CourseMapperModule {}
