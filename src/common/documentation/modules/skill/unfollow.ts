import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DetachEntitiesDto } from '../../../dtos/detach-entities.dto';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { SkillResponse } from '../../../responses/skill.response';

export const UnfollowDocumentation: ApiDocumentationParams = {
  authRequired: true,
  body: {
    type: DetachEntitiesDto,
  },
  ok: {
    type: [SkillResponse],
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Skill with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
