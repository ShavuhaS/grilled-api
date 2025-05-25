import { ApiProperty } from '@nestjs/swagger';

export class PageSizeResponse {
  @ApiProperty({
    description: 'Actual page size',
  })
  actual: number;

  @ApiProperty({
    description: 'Requested page size',
  })
  requested: number;
}

export class PaginationTotalResponse {
  @ApiProperty({
    description: 'Total number of pages',
  })
  pages: number;

  @ApiProperty({
    description: 'Total number of elements',
  })
  elements: number;
}

export class PaginationResponse {
  @ApiProperty({
    description: 'Requested page number',
  })
  page: number;

  @ApiProperty({
    description: 'Page size information',
    type: PageSizeResponse,
  })
  pageSize: PageSizeResponse;

  @ApiProperty({
    description: 'Total elements/pages',
    type: PaginationTotalResponse,
  })
  total: PaginationTotalResponse;
}
