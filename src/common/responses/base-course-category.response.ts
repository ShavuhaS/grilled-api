import { ApiProperty } from '@nestjs/swagger';

export class BaseCourseCategoryResponse {
  @ApiProperty({
    description: 'Course category id',
  })
    id: string;

  @ApiProperty({
    description: 'Course category name',
  })
    name: string;
}
