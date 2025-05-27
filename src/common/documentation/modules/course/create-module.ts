import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { CourseModuleResponse } from '../../../responses/course-module.response';
import { CreateCourseModuleDto } from '../../../dtos/create-course-module.dto';

export const CreateModuleDocumentation: ApiDocumentationParams = {
  authRequired: true,
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
  ],
  body: {
    type: CreateCourseModuleDto,
  },
  created: {
    type: CourseModuleResponse,
  },
  policies: ['Teacher should own the course'],
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course with such id was not found
      
    InvalidBodyException:
      Module name must not be empty
      Module name must be a string
      Module name must be at least 5 characters long
      Module name must be at most 30 characters long`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
