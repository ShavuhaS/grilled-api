import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenResponse } from './access-token.response';

export class TokensResponse extends AccessTokenResponse {
  @ApiProperty({
    description: 'Refresh token',
  })
  refreshToken: string;
}
