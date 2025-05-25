import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  override handleRequest(err, user, info, ctx: ExecutionContext) {
    if (err || !user) {
      return null;
    }
    return user;
  }
}
