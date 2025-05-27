import { Module } from '@nestjs/common';
import { CourseAbilityFactory } from './course-ability.factory';
import { PrismaModule } from '../../../database/prisma.module';
import { SkillAbilityFactory } from './skill-ability.factory';

@Module({
  providers: [CourseAbilityFactory, SkillAbilityFactory],
  exports: [CourseAbilityFactory, SkillAbilityFactory],
  imports: [PrismaModule],
})
export class CaslFactoryModule {}
