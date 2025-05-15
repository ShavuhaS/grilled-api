import { Module } from '@nestjs/common';
import { CourseModuleService } from './course-module.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  providers: [CourseModuleService],
  exports: [CourseModuleService],
  imports: [PrismaModule],
})
export class CourseModuleModule {}
