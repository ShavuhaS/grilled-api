import { ApiProperty } from '@nestjs/swagger';
import { CourseWithProgressResponse } from './course-with-progress.response';
import { PaginationResponse } from './pagination.response';

export class PaginatedUserCoursesResponse {
  @ApiProperty({
    description: 'List of courses',
    type: [CourseWithProgressResponse],
  })
  data: CourseWithProgressResponse[];

  @ApiProperty({
    description: 'Pagination data',
    type: PaginationResponse,
  })
  pagination: PaginationResponse;
}
