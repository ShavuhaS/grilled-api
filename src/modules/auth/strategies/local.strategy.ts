import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { DbUser } from '../../../database/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super({ usernameField: 'email' } as any);
  }

  async validate (email: string, password: string): Promise<DbUser | null> {
    return this.authService.validateUser(email, password);
  }
}
