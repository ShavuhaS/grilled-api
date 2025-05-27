import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  OrderByQuery,
  PaginationQueries,
  SearchQuery,
} from '../../default-queries.constants';
import { CourseLevelEnum } from '../../../enums/course-level.enum';
import { DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { PaginatedCoursesResponse } from '../../../responses/paginated-courses.response';

export const GetAllDocumentation: ApiDocumentationParams = {
  authRequired: false,
  policies: ['Own courses are returned only to authorized users'],
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
      name: 'authorId[in]',
      type: 'string',
      required: false,
    },
    {
      name: 'level[in]',
      enum: CourseLevelEnum,
      isArray: true,
      required: false,
    },
    {
      name: 'duration[min]',
      type: Number,
      required: false,
      minimum: 0,
    },
    {
      name: 'duration[max]',
      type: Number,
      required: false,
      minimum: 0,
    },
    {
      name: 'rating[min]',
      type: Number,
      required: false,
      minimum: 0,
      maximum: 5,
    },
    {
      name: 'rating[max]',
      type: Number,
      required: false,
      minimum: 0,
      maximum: 5,
    },
  ],
  ok: {
    type: PaginatedCoursesResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Min duration must be a number
      Min duration must be positive
      Max duration must be a number
      Max duration must be positive
      Min rating must be a number
      Min rating must be positive
      Min rating must be at most 5
      Max rating must be a number
      Max rating must be positive
      Min rating must be at most 5
      Search must be a string
      Order by must be a string
      Order by format is invalid
      My should be a boolean`,
  },
  unauthorized: DefaultUnauthorizedResponse,
};
