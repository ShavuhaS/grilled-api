import { ApiProperty } from '@nestjs/swagger';

export class CheckEditableResponse {
  @ApiProperty({
    description: 'Boolean flag which indicates whether course is editable',
  })
  isEditable: boolean;
}
