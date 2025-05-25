import { ApiProperty } from '@nestjs/swagger';

export class SkillResponse {
  @ApiProperty({
    description: 'Skill id',
  })
  id: string;

  @ApiProperty({
    description: 'Skill name',
  })
  name: string;
}
