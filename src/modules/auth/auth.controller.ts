import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegistrationDto } from '../../common/dtos/registration.dto';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { AuthDocumentation } from '../../common/documentation/modules/auth';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { RefreshGuard } from '../../common/guards/refresh.guard';
import { AccessTokenResponse } from '../../common/responses/access-token.response';
import { TokensResponse } from '../../common/responses/tokens.response';

@ApiTags('Auth')
@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiEndpoint({
    summary: 'User account registration',
    documentation: AuthDocumentation.SIGN_UP,
  })
  @Post('/signUp')
  async signUp (@Body() body: RegistrationDto) {
    return this.authService.signUp(body);
  }

  @ApiEndpoint({
    summary: 'Verify email using email verification token',
    documentation: AuthDocumentation.VERIFY_EMAIL,
  })
  @Post('/verifyEmail/:token')
  async verifyEmail (@Param('token') token: string): Promise<TokensResponse> {
    return this.authService.verifyEmail(token);
  }

  @ApiEndpoint({
    summary: 'Get information about the authorized user',
    documentation: AuthDocumentation.GET_ME,
    guards: JwtGuard,
  })
  @Get('/me')
  async getMe (@Request() req) {
    return req.user;
  }

  @ApiEndpoint({
    summary: 'Log into an account',
    documentation: AuthDocumentation.LOGIN,
    guards: LocalAuthGuard,
  })
  @Post('/login')
  async login (@Request() req): Promise<TokensResponse> {
    return this.authService.login(req.user);
  }

  @ApiEndpoint({
    summary: 'Get a new access token using a refresh token',
    documentation: AuthDocumentation.REFRESH,
    guards: RefreshGuard,
  })
  @Get('/refresh')
  async refresh (@Request() req): Promise<AccessTokenResponse> {
    return this.authService.refreshToken(req.user);
  }
}
