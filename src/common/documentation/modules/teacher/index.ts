import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { UpdateMeDocumentation } from './update';
import { GetCoursesDocumentation } from './get-courses';

export const TeacherDocumentation = {
  UPDATE_ME: UpdateMeDocumentation,
  GET_COURSES: GetCoursesDocumentation,
} satisfies Record<string, ApiDocumentationParams>;
