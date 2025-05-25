import { ApiProperty } from '@nestjs/swagger';
import { SkillResponse } from './skill.response';
import { PaginationResponse } from './pagination.response';

export class PaginatedSkillsResponse {
  @ApiProperty({
    description: 'Skills array',
    type: [SkillResponse],
  })
  data: SkillResponse[];

  @ApiProperty({
    description: 'Pagination data',
    type: PaginationResponse,
  })
  pagination: PaginationResponse;
}
