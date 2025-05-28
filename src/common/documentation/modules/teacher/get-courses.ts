import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { OrderByQuery, PaginationQueries, SearchQuery } from '../../default-queries.constants';
import { PaginatedCoursesResponse } from '../../../responses/paginated-courses.response';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { CourseStatusEnum } from '../../../enums/course-status.enum';

export const GetCoursesDocumentation: ApiDocumentationParams = {
  authRequired: true,
  queries: [
    ...PaginationQueries,
    OrderByQuery,
    SearchQuery,
    {
      name: 'status[in]',
      enum: CourseStatusEnum,
      isArray: true,
      required: false,
    },
  ],
  ok: {
    type: PaginatedCoursesResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Page must be a number
      Page must be positive
      Page size must be a number
      Page size must be positive
      Each of the course statuses must be a valid enum
      Search must be a string
      Order by must be a string
      Order by format is invalid`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};