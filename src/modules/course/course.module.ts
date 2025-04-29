import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
  imports: [AuthModule, CaslModule, PrismaModule],
})
export class CourseModule {}
