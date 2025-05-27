import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { AttachEntitiesDto } from '../../../dtos/attach-entities.dto';
import { SkillResponse } from '../../../responses/skill.response';

export const FollowDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only students can follow skills'],
  body: {
    type: AttachEntitiesDto,
  },
  created: {
    type: [SkillResponse],
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Skill with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
