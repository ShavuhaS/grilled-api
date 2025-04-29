import { PolicyHandler } from '../../interfaces/policy-handler.interface';
import { courseCreatePolicy } from './create';
import { CourseEnrollPolicy } from './enroll';
import { CourseAction } from '../../actions/course-action.enum';

export const CoursePolicies: Record<string, PolicyHandler<CourseAction>> = {
  CREATE: courseCreatePolicy,
  ENROLL: CourseEnrollPolicy,
};