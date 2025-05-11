import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../../../config/services/security-config.service';
import { cookieExtractor } from '../../../common/utils/cookie-extractor.util';
import { JwtPayload } from '../types/jwt-payload.type';
import { DbUser } from '../../../database/entities/user.entity';
import { AuthService } from '../auth.service';
import { REFRESH_TOKEN_COOKIE } from '../constants/cookie-names.const';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor (
    private securityConfig: SecurityConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor(REFRESH_TOKEN_COOKIE),
      ]),
      ignoreExpiration: false,
      secretOrKey: securityConfig.refreshSecret,
    } as any);
  }

  async validate (payload: JwtPayload): Promise<DbUser> {
    return this.authService.validateUserPayload(payload);
  }
}
