import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';

export const DeleteModuleDocumentatiton: ApiDocumentationParams = {
  authRequired: true,
  policies: ["Teacher should own the module's course"],
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
    {
      name: 'moduleId',
      type: String,
      required: true,
    },
  ],
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course with such id was not found
      Module with such id was not found
    
    CourseModuleDisconnectionException:
      Course with such id has no module with such id`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
