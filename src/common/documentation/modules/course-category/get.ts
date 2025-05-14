import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { CourseCategoryResponse } from '../../../responses/course-category.response';

export const GetDocumentation: ApiDocumentationParams = {
  authRequired: false,
  params: [
    {
      name: 'id',
      type: String,
      required: true,
    },
  ],
  ok: {
    type: CourseCategoryResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course Category with such id was not found`,
  },
};
