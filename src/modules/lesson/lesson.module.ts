import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { PrismaModule } from '../../database/prisma.module';
import { TestModule } from '../test/test.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [LessonService],
  exports: [LessonService],
  imports: [PrismaModule, TestModule, StorageModule],
})
export class LessonModule {}
