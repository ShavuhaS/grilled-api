import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { SignUpDocumentation } from './sign-up';

export const AuthDocumentation: Record<string, ApiDocumentationParams> = {
  SIGN_UP: SignUpDocumentation,
};