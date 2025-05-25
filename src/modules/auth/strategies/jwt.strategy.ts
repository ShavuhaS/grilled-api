import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../../../config/services/security-config.service';
import { cookieExtractor } from '../../../common/utils/cookie-extractor.util';
import { JwtPayload } from '../types/jwt-payload.type';
import { DbUser } from '../../../database/entities/user.entity';
import { AuthService } from '../auth.service';
import { ACCESS_TOKEN_COOKIE } from '../constants/cookie-names.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private securityConfig: SecurityConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor(ACCESS_TOKEN_COOKIE),
      ]),
      ignoreExpiration: false,
      secretOrKey: securityConfig.accessSecret,
    } as any);
  }

  async validate(payload: JwtPayload): Promise<DbUser> {
    return this.authService.validateUserPayload(payload);
  }
}
