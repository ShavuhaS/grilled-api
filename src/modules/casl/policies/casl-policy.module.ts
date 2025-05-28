import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../database/prisma.module';
import { CourseEnrollPolicy } from './course/enroll';
import { CourseUpdatePolicy } from './course/update';
import { CourseAccessContentPolicy } from './course/access-content';
import { CoursePublishPolicy } from './course/publish';
import { CourseCheckStatusPolicy } from './course/check-status';
import { CourseCompletePolicy } from './course/complete';
import { TeacherUpdateMePolicy } from './teacher/update-me';
import { TeacherGetMePolicy } from './teacher/get-me';

@Module({
  providers: [
    CourseEnrollPolicy,
    CourseUpdatePolicy,
    CourseAccessContentPolicy,
    CoursePublishPolicy,
    CourseCheckStatusPolicy,
    CourseCompletePolicy,
    TeacherUpdateMePolicy,
    TeacherGetMePolicy,
  ],
  exports: [
    CourseEnrollPolicy,
    CourseUpdatePolicy,
    CourseAccessContentPolicy,
    CoursePublishPolicy,
    CourseCheckStatusPolicy,
    CourseCompletePolicy,
    TeacherUpdateMePolicy,
    TeacherGetMePolicy,
  ],
  imports: [PrismaModule],
})
export class CaslPolicyModule {}
