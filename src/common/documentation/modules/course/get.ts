import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { CourseResponse } from '../../../responses/course.response';

export const GetDocumentation: ApiDocumentationParams = {
  authRequired: false,
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
  ],
  ok: {
    type: CourseResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Course with such id was not found`,
  },
};