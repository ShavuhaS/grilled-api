import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { UpdateMeDocumentation } from './update';

export const TeacherDocumentation = {
  UPDATE_ME: UpdateMeDocumentation,
} satisfies Record<string, ApiDocumentationParams>;
