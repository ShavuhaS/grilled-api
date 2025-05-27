import { Module } from '@nestjs/common';
import { CourseAbilityFactory } from './course-ability.factory';
import { PrismaModule } from '../../../database/prisma.module';
import { SkillAbilityFactory } from './skill-ability.factory';
import { CourseCategoryAbilityFactory } from './course-category-ability.factory';
import { TeacherAbilityFactory } from './teacher-ability.factory';

@Module({
  providers: [
    CourseAbilityFactory,
    SkillAbilityFactory,
    CourseCategoryAbilityFactory,
    TeacherAbilityFactory,
  ],
  exports: [
    CourseAbilityFactory,
    SkillAbilityFactory,
    CourseCategoryAbilityFactory,
    TeacherAbilityFactory,
  ],
  imports: [PrismaModule],
})
export class CaslFactoryModule {}
