import { ApiProperty } from '@nestjs/swagger';

export class BaseTeacherResponse {
  @ApiProperty({
    description: "Teacher's workplace",
  })
  workplace?: string;

  @ApiProperty({
    description: "Teacher's job position",
  })
  position?: string;

  @ApiProperty({
    description: "Teacher's bio description",
  })
  aboutMe?: string;
}
