import { Module } from '@nestjs/common';
import { CourseAbilityFactory } from './course-ability.factory';
import { PrismaModule } from '../../../database/prisma.module';

@Module({
  providers: [CourseAbilityFactory],
  exports: [CourseAbilityFactory],
  imports: [PrismaModule],
})
export class CaslFactoryModule {}