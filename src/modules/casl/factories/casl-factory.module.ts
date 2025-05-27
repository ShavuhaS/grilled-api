import { Module } from '@nestjs/common';
import { CourseAbilityFactory } from './course-ability.factory';
import { PrismaModule } from '../../../database/prisma.module';
import { SkillAbilityFactory } from './skill-ability.factory';
import { CourseCategoryAbilityFactory } from './course-category-ability.factory';

@Module({
  providers: [
    CourseAbilityFactory,
    SkillAbilityFactory,
    CourseCategoryAbilityFactory,
  ],
  exports: [
    CourseAbilityFactory,
    SkillAbilityFactory,
    CourseCategoryAbilityFactory,
  ],
  imports: [PrismaModule],
})
export class CaslFactoryModule {}
