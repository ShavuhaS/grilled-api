import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { AttachEntitiesDto } from '../../../dtos/attach-entities.dto';
import { BaseCourseCategoryResponse } from '../../../responses/base-course-category.response';

export const FollowDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only students can unfollow course categories'],
  body: {
    type: AttachEntitiesDto,
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
