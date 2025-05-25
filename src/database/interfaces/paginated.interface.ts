import { PaginationResponse } from '../../common/responses/pagination.response';

export interface Paginated<T> {
  data: T[];
  pagination: PaginationResponse;
}
