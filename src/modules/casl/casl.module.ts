import { Module } from '@nestjs/common';
import { CourseAbilityFactory } from './factories/course-ability.factory';
import { CourseEnrollPolicy } from './policies/course/enroll';
import { PrismaModule } from '../../database/prisma.module';
import { CourseUpdatePolicy } from './policies/course/update';

@Module({
  providers: [CourseAbilityFactory, CourseEnrollPolicy, CourseUpdatePolicy],
  exports: [CourseAbilityFactory, CourseEnrollPolicy, CourseUpdatePolicy],
  imports: [PrismaModule],
})
export class CaslModule {}
