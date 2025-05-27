import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegistrationDto } from '../../common/dtos/registration.dto';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { AuthDocumentation } from '../../common/documentation/modules/auth';
import { JwtGuard } from '../../common/guards/auth/jwt.guard';
import { LocalAuthGuard } from '../../common/guards/auth/local-auth.guard';
import { RefreshGuard } from '../../common/guards/auth/refresh.guard';
import { AccessTokenResponse } from '../../common/responses/access-token.response';
import { TokensResponse } from '../../common/responses/tokens.response';
import { UserService } from '../user/user.service';
import { UserMapper } from '../user/mappers/user.mapper';
import { User } from '../../common/decorators/user.decorator';
import { DbUser } from '../../database/entities/user.entity';

@ApiTags('Auth')
@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private userMapper: UserMapper,
  ) {}

  @ApiEndpoint({
    summary: 'User account registration',
    documentation: AuthDocumentation.SIGN_UP,
  })
  @Post('/signUp')
  async signUp(@Body() body: RegistrationDto) {
    return this.authService.signUp(body);
  }

  @ApiEndpoint({
    summary: 'Verify email using email verification token',
    documentation: AuthDocumentation.VERIFY_EMAIL,
  })
  @Post('/verifyEmail/:token')
  async verifyEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokensResponse> {
    const { accessToken, refreshToken } =
      await this.authService.verifyEmail(token);
    this.authService.setAccessTokenCookie(res, accessToken);
    this.authService.setRefreshTokenCookie(res, refreshToken);
    return { accessToken, refreshToken };
  }

  @ApiEndpoint({
    summary: 'Get information about the authorized user',
    documentation: AuthDocumentation.GET_ME,
    guards: JwtGuard,
  })
  @Get('/me')
  async getMe(@Request() req) {
    const user = await this.userService.getById(req.user.id, true);
    return this.userMapper.toUserResponse(user);
  }

  @ApiEndpoint({
    summary: 'Log into an account',
    documentation: AuthDocumentation.LOGIN,
    guards: LocalAuthGuard,
  })
  @Post('/login')
  async login(
    @User() user: DbUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokensResponse> {
    const { accessToken, refreshToken } = this.authService.login(user);
    this.authService.setAccessTokenCookie(res, accessToken);
    this.authService.setRefreshTokenCookie(res, refreshToken);
    return { accessToken, refreshToken };
  }

  @ApiEndpoint({
    summary: 'Log out of the account',
    documentation: AuthDocumentation.LOGOUT,
    guards: JwtGuard,
  })
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.clearAccessTokenCookie(res);
    this.authService.clearRefreshTokenCookie(res);
  }

  @ApiEndpoint({
    summary: 'Get a new access token using a refresh token',
    documentation: AuthDocumentation.REFRESH,
    guards: RefreshGuard,
  })
  @Get('/refresh')
  async refresh(
    @User() user: DbUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    const { accessToken } = this.authService.refreshToken(user);
    this.authService.setAccessTokenCookie(res, accessToken);
    return { accessToken };
  }
}
