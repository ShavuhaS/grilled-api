import { ApiQueryOptions } from '@nestjs/swagger';

export const PaginationQueries: ApiQueryOptions[] = [
  {
    name: 'page',
    type: Number,
    required: false,
  },
  {
    name: 'pageSize',
    type: Number,
    required: false,
  },
];

export const OrderByQuery: ApiQueryOptions = {
  name: 'orderBy',
  type: String,
  required: false,
};

export const SearchQuery: ApiQueryOptions = {
  name: 'search',
  type: String,
  required: false,
};