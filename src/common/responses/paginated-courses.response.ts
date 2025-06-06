import { ApiProperty } from '@nestjs/swagger';
import { CourseWithProgressResponse } from './course-with-progress.response';
import { PaginationResponse } from './pagination.response';
import { BaseCourseResponse } from './base-course.response';

export class PaginatedCoursesResponse {
  @ApiProperty({
    description: 'List of courses',
    type: [BaseCourseResponse],
  })
  data: BaseCourseResponse[];

  @ApiProperty({
    description: 'Pagination data',
    type: PaginationResponse,
  })
  pagination: PaginationResponse;
}
