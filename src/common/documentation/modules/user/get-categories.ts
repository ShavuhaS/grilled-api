import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { BaseCourseCategoryResponse } from '../../../responses/base-course-category.response';

export const GetCategoriesDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only students can have followed categories'],
  ok: {
    type: [BaseCourseCategoryResponse],
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
