import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';

export const PublishDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the owner of the course can publish it'],
  badRequest: {
    description: `
    InvalidEntityIdException:
      Course with such id was not found
    
    EmptyCourseContentException:
      Course content is invalid. Course is empty
      Course content is invalid. Module is empty`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
