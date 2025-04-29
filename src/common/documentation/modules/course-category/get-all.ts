import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { CourseCategoriesResponse } from '../../../responses/course-categories.response';

export const GetAllDocumentation: ApiDocumentationParams = {
  authRequired: false,
  ok: {
    type: CourseCategoriesResponse,
  },
};