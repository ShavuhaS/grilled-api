import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron } from '@nestjs/schedule';
import { UserState } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../database/repositories/user.repository';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { DbUser } from '../../database/entities/user.entity';
import { JwtPayload } from './types/jwt-payload.type';
import { TokensResponse } from '../../common/responses/tokens.response';
import { SecurityConfigService } from '../../config/security-config.service';
import { UrlConfigService } from '../../config/url-config.service';
import { UserStateEnum } from '../../common/enums/user-state.enum';
import { EmailNotConfirmedException } from '../../common/exceptions/email-not-confirmed.exception';
import { RegistrationDto } from '../../common/dtos/registration.dto';
import { AlreadyRegisteredException } from '../../common/exceptions/already-registered.exception';
import { EmailTokenRepository } from '../../database/repositories/email-token.repository';
import { EmailAlreadySentException } from '../../common/exceptions/email-already-sent.exception';
import { HOUR } from '../../common/utils/time.constants';
import { EmailService } from '../email/email.service';
import { InvalidTokenException } from '../../common/exceptions/invalid-token.exception';
import { TokenExpiredException } from '../../common/exceptions/token-expired.exception';
import { AccessTokenResponse } from '../../common/responses/access-token.response';

@Injectable()
export class AuthService {
  constructor (
    private userRepository: UserRepository,
    private emailTokenRepository: EmailTokenRepository,
    private jwtService: JwtService,
    private securityConfig: SecurityConfigService,
    private urlConfig: UrlConfigService,
    private emailService: EmailService,
  ) {}

  async validateUser (email: string, password: string): Promise<DbUser> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    if (!(await this.checkPassword(password, user.password))) {
      throw new UnauthorizedException();
    }

    if (user.state !== UserStateEnum.CONFIRMED) {
      throw new EmailNotConfirmedException();
    }

    delete user.password;
    return user;
  }

  async validateUserPayload (payload: JwtPayload): Promise<DbUser> {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.lastPasswordChange.getTime() > payload.createdAt) {
      throw new UnauthorizedException(
        'Token has expired due to change of password',
      );
    }

    delete user.password;
    return user;
  }

  async hashPassword (password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async checkPassword (password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  createPayload (user: DbUser): JwtPayload {
    return {
      sub: user.id,
      username: user.email,
      createdAt: Date.now(),
    };
  }

  getTokens (user: DbUser): TokensResponse {
    const payload = this.createPayload(user);

    return {
      accessToken: this.getAccessToken(payload),
      refreshToken: this.getRefreshToken(payload),
    };
  }

  getAccessToken (user: JwtPayload): string {
    return this.jwtService.sign(user);
  }

  getRefreshToken (user: JwtPayload): string {
    return this.jwtService.sign(user, {
      secret: this.securityConfig.refreshSecret,
      expiresIn: this.securityConfig.refreshTtl,
    } as any);
  }

  login (user: DbUser): TokensResponse {
    if (user.state !== UserStateEnum.CONFIRMED) {
      throw new EmailNotConfirmedException();
    }

    return this.getTokens(user);
  }

  refreshToken (user: DbUser): AccessTokenResponse {
    const payload = this.createPayload(user);

    return { accessToken: this.getAccessToken(payload) };
  }

  async signUp (dto: RegistrationDto) {
    const user = await this.userRepository.findOne({ email: dto.email });
    if (!!user) {
      throw new AlreadyRegisteredException();
    }

    const newUser = await this.userRepository.create({
      ...dto,
      password: await this.hashPassword(dto.password),
    });

    await this.sendVerificationEmail(newUser);
  }

  async sendVerificationEmail (user: DbUser) {
    const existingToken = await this.emailTokenRepository.findByUserId(user.id);
    if (!!existingToken) {
      throw new EmailAlreadySentException();
    }

    const { id: userId, email: to } = user;
    const { token } = await this.emailTokenRepository.create(userId);
    const link = `${this.urlConfig.front}/email/${token}`;

    await this.emailService.sendVerificationEmail({ to, link });
  }

  // Every hour
  @Cron('0 0 */1 * * *')
  async deleteUnverifiedAccounts () {
    const hourAgo = new Date(Date.now() - HOUR);
    const { count } = await this.userRepository.deleteMany({
      state: UserState.PENDING,
      createdAt: {
        lt: hourAgo,
      },
    });

    console.info(`Successfully deleted ${count} unverified users`);
  }

  async verifyEmail (token: string): Promise<TokensResponse> {
    const res = await this.emailTokenRepository.find(token, { user: true });

    if (!res) {
      throw new InvalidTokenException();
    }

    const { user, createdAt } = res;
    if (Date.now() - createdAt.getTime() > HOUR) {
      await this.userRepository.delete({ id: user.id });

      throw new TokenExpiredException();
    }

    const updatedUser = await this.userRepository.update({
      id: user.id,
    }, {
      state: UserState.CONFIRMED,
      verifyEmailToken: {
        delete: true,
      },
    });

    return this.getTokens(updatedUser);
  }
}
