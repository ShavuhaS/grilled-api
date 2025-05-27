import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { BaseCourseCategoryResponse } from '../../../responses/base-course-category.response';
import { DetachEntitiesDto } from '../../../dtos/detach-entities.dto';

export const UnfollowDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only students can unfollow course categories'],
  body: {
    type: DetachEntitiesDto,
  },
  created: {
    type: [BaseCourseCategoryResponse],
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course Category with such id was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
