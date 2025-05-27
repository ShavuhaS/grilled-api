import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../database/prisma.module';
import { CourseEnrollPolicy } from './course/enroll';
import { CourseUpdatePolicy } from './course/update';
import { CourseAccessContentPolicy } from './course/access-content';
import { CoursePublishPolicy } from './course/publish';
import { CourseCheckStatusPolicy } from './course/check-status';
import { CourseCompletePolicy } from './course/complete';
import { TeacherUpdateMePolicy } from './teacher/update-me';

@Module({
  providers: [
    CourseEnrollPolicy,
    CourseUpdatePolicy,
    CourseAccessContentPolicy,
    CoursePublishPolicy,
    CourseCheckStatusPolicy,
    CourseCompletePolicy,
    TeacherUpdateMePolicy,
  ],
  exports: [
    CourseEnrollPolicy,
    CourseUpdatePolicy,
    CourseAccessContentPolicy,
    CoursePublishPolicy,
    CourseCheckStatusPolicy,
    CourseCompletePolicy,
    TeacherUpdateMePolicy,
  ],
  imports: [PrismaModule],
})
export class CaslPolicyModule {}
