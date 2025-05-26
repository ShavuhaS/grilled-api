import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarDto {
  @ApiProperty({
    description: 'Avatar file',
    type: 'string',
    format: 'binary',
  })
  avatar: any;
}
