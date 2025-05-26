import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { PaginatedSkillsResponse } from '../../../responses/paginated-skills.response';
import {
  OrderByQuery,
  PaginationQueries,
  SearchQuery,
} from '../../default-queries.constants';

export const GetAllDocumentation: ApiDocumentationParams = {
  authRequired: false,
  queries: [...PaginationQueries, OrderByQuery, SearchQuery],
  ok: {
    type: PaginatedSkillsResponse,
  },
};
