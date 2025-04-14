import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export const cookieExtractor: (string) => JwtFromRequestFunction =
  (cookieName: string) => (req: Request) => {
    return req.cookies?.[cookieName] ?? null;
  };
