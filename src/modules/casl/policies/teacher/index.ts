import { PolicyHandler } from '../../interfaces/policy-handler.interface';
import { TeacherAction } from '../../../../common/enums/teacher-action.enum';
import { TeacherUpdateMePolicy } from './update-me';

export const TeacherPolicies = {
  UPDATE_ME: TeacherUpdateMePolicy,
} satisfies Record<string, PolicyHandler<TeacherAction>>;