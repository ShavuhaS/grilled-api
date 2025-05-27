import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';
import { PrismaModule } from '../../database/prisma.module';
import { CourseMapperModule } from './mappers/course-mapper.module';
import { UploadModule } from '../upload/upload.module';
import { MediaModule } from '../media/media.module';
import { StorageModule } from '../storage/storage.module';
import { LessonMapperModule } from '../lesson/mappers/lesson-mapper.module';
import { LessonModule } from '../lesson/lesson.module';
import { CourseModuleModule } from '../course-module/course-module.module';
import { CourseModuleMapperModule } from '../course-module/mappers/course-module-mapper.module';
import { TestModule } from '../test/test.module';
import { TestMapperModule } from '../test/mappers/test-mapper.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
  imports: [
    AuthModule,
    CaslModule,
    PrismaModule,
    UploadModule,
    MediaModule,
    StorageModule,
    CourseModuleModule,
    LessonModule,
    TestModule,
    CourseMapperModule,
    CourseModuleMapperModule,
    LessonMapperModule,
    TestMapperModule,
  ],
})
export class CourseModule {}
