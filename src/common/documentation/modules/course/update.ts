import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { UpdateCourseDto } from '../../../dtos/update-course.dto';
import { BaseCourseResponse } from '../../../responses/base-course.response';

export const UpdateDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the course owner can update the course info'],
  body: {
    type: UpdateCourseDto,
  },
  ok: {
    type: BaseCourseResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Category id must not be empty
      Category id must be a valid UUID
      Course name must not be empty
      Course name must be a string
      Course name must be at least 5 characters long
      Course name must be at most 60 characters long
      Course description must not be empty
      Course description must be a string
      Course description must be at most 1000 characters long
      Course level must not be empty
      Course level must be either BEGINNER, INTERMEDIATE or EXPERT
    
    InvalidEntityIdException:
      Course with such id was not found
      Course Category with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
