import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { SkillResponse } from '../../../responses/skill.response';

export const GetSkillsDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only students can have followed skills'],
  ok: {
    type: [SkillResponse],
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
