import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { AttachEntitiesDto } from '../../../dtos/attach-entities.dto';
import { CourseResponse } from '../../../responses/course.response';

export const AttachSkillsDocumentation: ApiDocumentationParams = {
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
    type: AttachEntitiesDto,
  },
  created: {
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
