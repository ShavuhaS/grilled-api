import { PolicyHandler } from '../../interfaces/policy-handler.interface';
import { CourseAction } from '../../actions/course-action.enum';
import { courseCreatePolicy } from './create';
import { CourseEnrollPolicy } from './enroll';
import { CourseUpdatePolicy } from './update';
import { CourseAccessContentPolicy } from './access-content';
import { CoursePublishPolicy } from './publish';
import { CourseCheckStatusPolicy } from './check-status';
import { CourseCompletePolicy } from './complete';

export const CoursePolicies = {
  CREATE: courseCreatePolicy,
  ACCESS_CONTENT: CourseAccessContentPolicy,
  COMPLETE: CourseCompletePolicy,
  CHECK_STATUS: CourseCheckStatusPolicy,
  PUBLISH: CoursePublishPolicy,
  ENROLL: CourseEnrollPolicy,
  UPDATE: CourseUpdatePolicy,
  ATTACH_SKILLS: CourseUpdatePolicy,
  MODULE_CREATE: CourseUpdatePolicy,
  MODULE_DELETE: CourseUpdatePolicy,
  LESSON_CREATE: CourseUpdatePolicy,
  LESSON_UPDATE: CourseUpdatePolicy,
  LESSON_DELETE: CourseUpdatePolicy,
  VIDEO_UPLOAD: CourseUpdatePolicy,
  ARTICLE_UPDATE: CourseUpdatePolicy,
} satisfies Record<string, PolicyHandler<CourseAction>>;
