import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { CourseResponse } from '../../../responses/course.response';
import { DetachEntitiesDto } from '../../../dtos/detach-entities.dto';

export const DetachSkillsDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the course owner can manage links'],
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
  ],
  body: {
    type: DetachEntitiesDto,
  },
  ok: {
    type: CourseResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Ids must not be empty
      Ids must be an array
      Each id must be a valid UUID
    
    InvalidEntityIdException:
      Course with such id was not found
      Skill with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
