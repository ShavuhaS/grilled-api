import { PolicyHandler } from '../../interfaces/policy-handler.interface';
import { TeacherAction } from '../../../../common/enums/teacher-action.enum';
import { TeacherUpdateMePolicy } from './update-me';
import { TeacherGetMePolicy } from './get-me';

export const TeacherPolicies = {
  UPDATE_ME: TeacherUpdateMePolicy,
  GET_COURSES: TeacherGetMePolicy,
} satisfies Record<string, PolicyHandler<TeacherAction>>;
