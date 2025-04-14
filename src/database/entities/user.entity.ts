import { RoleEnum } from '../../common/enums/role.enum';
import { UserStateEnum } from '../../common/enums/user-state.enum';
import { DbVerifyEmailToken } from './verify-email-token.entity';

export class DbUser {
  id: string;
  googleId?: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  state: UserStateEnum;
  role: RoleEnum;
  lastPasswordChange: Date;
  lastLogin: Date;
  loginStreak: number;
  createdAt?: Date;
  updatedAt?: Date;
  verifyEmailToken?: DbVerifyEmailToken;
}
