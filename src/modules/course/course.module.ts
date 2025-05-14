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

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
  imports: [
    AuthModule,
    CaslModule,
    PrismaModule,
    CourseMapperModule,
    UploadModule,
    MediaModule,
    StorageModule,
  ],
})
export class CourseModule {}
