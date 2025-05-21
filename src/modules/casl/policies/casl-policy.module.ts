import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../database/prisma.module';
import { CourseEnrollPolicy } from './course/enroll';
import { CourseUpdatePolicy } from './course/update';
import { CourseAccessContentPolicy } from './course/access-content';

@Module({
  providers: [CourseEnrollPolicy, CourseUpdatePolicy, CourseAccessContentPolicy],
  exports: [CourseEnrollPolicy, CourseUpdatePolicy, CourseAccessContentPolicy],
  imports: [PrismaModule],
})
export class CaslPolicyModule {}