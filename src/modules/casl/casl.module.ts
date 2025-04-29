import { Module } from '@nestjs/common';
import { CourseAbilityFactory } from './factories/course-ability.factory';
import { CourseEnrollPolicy } from './policies/course/enroll';
import { PrismaModule } from '../../database/prisma.module';
import { CourseUpdatePolicy } from './policies/course/update';
import { ModuleDeletePolicy } from './policies/course/module-delete';

@Module({
  providers: [
    CourseAbilityFactory,
    CourseEnrollPolicy,
    CourseUpdatePolicy,
    ModuleDeletePolicy,
  ],
  exports: [
    CourseAbilityFactory,
    CourseEnrollPolicy,
    CourseUpdatePolicy,
    ModuleDeletePolicy,
  ],
  imports: [PrismaModule],
})
export class CaslModule {}
