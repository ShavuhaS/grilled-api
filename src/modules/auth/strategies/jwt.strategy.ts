import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../../../config/security-config.service';
import { cookieExtractor } from '../../../common/utils/cookie-extractor.util';
import { JwtPayload } from '../types/jwt-payload.type';
import { DbUser } from '../../../database/entities/user.entity';
import { UserRepository } from '../../../database/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private securityConfig: SecurityConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor('access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: securityConfig.secret,
    } as any);
  }

  async validate (payload: JwtPayload): Promise<DbUser> {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.lastPasswordChange.getTime() > payload.createdAt) {
      throw new UnauthorizedException(
        'Token has expired due to change of email address',
      );
    }

    delete user.password;
    return user;
  }
}
