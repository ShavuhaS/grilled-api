import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponse {
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;
}
