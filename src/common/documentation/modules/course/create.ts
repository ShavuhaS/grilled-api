import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { CreateCourseDto } from '../../../dtos/create-course.dto';
import { BaseCourseResponse } from '../../../responses/base-course.response';

export const CreateDocumentation: ApiDocumentationParams = {
  authRequired: true,
  body: {
    type: CreateCourseDto,
  },
  created: {
    type: BaseCourseResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course Category with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
