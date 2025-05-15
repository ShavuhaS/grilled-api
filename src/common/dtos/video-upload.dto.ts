import { ApiProperty } from '@nestjs/swagger';

export class VideoUploadDto {
  @ApiProperty({
    description: 'Lesson video',
    type: 'string',
    format: 'binary',
  })
    video: any;
}