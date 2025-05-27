import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { BaseCourseModuleResponse } from '../../../responses/base-course-module.response';
import { UpdateCourseModuleDto } from '../../../dtos/update-course-module.dto';

export const UpdateModuleDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the course owner can update modules'],
  body: {
    type: UpdateCourseModuleDto,
  },
  ok: {
    type: BaseCourseModuleResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course with such id was not found
      Module with such id was not found
      
    CourseModuleDisconnectionException:
      Course with such id has no module with such id
     
    InvalidBodyException:
      Order must be a number
      Order must be positive
      Module name must not be empty
      Module name must be a string
      Module name must be at least 5 characters long
      Module name must be at most 30 characters long`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
