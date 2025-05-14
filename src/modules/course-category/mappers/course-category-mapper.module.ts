import { Module } from '@nestjs/common';
import { CourseCategoryMapper } from './course-category.mapper';

@Module({
  providers: [CourseCategoryMapper],
  exports: [CourseCategoryMapper],
})
export class CourseCategoryMapperModule {}
