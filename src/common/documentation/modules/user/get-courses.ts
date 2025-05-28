import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import {
  OrderByQuery,
  PaginationQueries,
  SearchQuery,
} from '../../default-queries.constants';
import { QueryUserCoursesDto } from '../../../dtos/query-user-courses.dto';
import { PaginatedUserCoursesResponse } from '../../../responses/paginated-user-courses.response';

export const GetCoursesDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only students can get their courses'],
  queries: [
    ...PaginationQueries,
    OrderByQuery,
    SearchQuery,
    {
      name: 'categoryId[in]',
      type: 'string',
      required: false,
    },
    {
      name: 'skillId[in]',
      type: 'string',
      required: false,
    },
    {
      name: 'status[in]',
      type: 'string',
      required: false,
    },
  ],
  ok: {
    type: PaginatedUserCoursesResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
