import { ApiProperty } from '@nestjs/swagger';

export class BaseCourseModuleResponse {
  @ApiProperty({
    description: 'Course module id',
  })
  id: string;

  @ApiProperty({
    description: 'Course module name',
  })
  name: string;

  @ApiProperty({
    description: 'Course module number (within course)',
  })
  number: number;

  @ApiProperty({
    description: 'Estimated time to complete the module (in minutes)',
  })
  estimatedTime: number;
}
