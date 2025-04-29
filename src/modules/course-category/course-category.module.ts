import { Module } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CourseCategoryController } from './course-category.controller';
import { CourseCategoryMapperModule } from './mappers/course-category-mapper.module';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService],
  exports: [CourseCategoryService],
  imports: [CourseCategoryMapperModule, PrismaModule],
})
export class CourseCategoryModule {}
