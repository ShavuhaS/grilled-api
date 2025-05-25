import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CourseTeacherResponse {
  @ApiProperty({
    description: 'Teacher id',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Teacher avatar',
  })
  avatar?: string;

  @ApiProperty({
    description: 'Teacher name',
  })
  name: string;

  @ApiProperty({
    description: 'Teacher surname',
  })
  surname: string;

  @ApiPropertyOptional({
    description: 'Teacher workplace',
  })
  workplace?: string;
}
