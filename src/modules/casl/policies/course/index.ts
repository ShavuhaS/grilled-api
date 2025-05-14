import { PolicyHandler } from '../../interfaces/policy-handler.interface';
import { CourseAction } from '../../actions/course-action.enum';
import { courseCreatePolicy } from './create';
import { CourseEnrollPolicy } from './enroll';
import { CourseUpdatePolicy } from './update';

export const CoursePolicies: Record<string, PolicyHandler<CourseAction>> = {
  CREATE: courseCreatePolicy,
  ENROLL: CourseEnrollPolicy,
  UPDATE: CourseUpdatePolicy,
  MODULE_CREATE: CourseUpdatePolicy,
  MODULE_DELETE: CourseUpdatePolicy,
  LESSON_CREATE: CourseUpdatePolicy,
};
