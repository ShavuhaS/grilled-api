import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { CourseModuleResponse } from '../../../responses/course-module.response';

export const CreateModuleDocumentation: ApiDocumentationParams = {
  authRequired: true,
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
  ],
  created: {
    type: CourseModuleResponse,
  },
  policies: ['Teacher should own the course'],
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
