import { DbUser } from './user.entity';

export class DbVerifyEmailToken {
  userId: string;
  token: string;
  user?: DbUser;
  createdAt?: Date;
  updatedAt?: Date;
}
