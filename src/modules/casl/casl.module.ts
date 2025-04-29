import { Module } from '@nestjs/common';
import { CourseAbilityFactory } from './factories/course-ability.factory';
import { CourseEnrollPolicy } from './policies/course/enroll';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  providers: [CourseAbilityFactory, CourseEnrollPolicy],
  exports: [CourseAbilityFactory, CourseEnrollPolicy],
  imports: [PrismaModule],
})
export class CaslModule {}
