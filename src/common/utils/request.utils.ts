import { Request } from 'express';

export class RequestUtils {
  static get<T>(req: Request, field: string): T {
    return req.params[field] ?? req.query[field] ?? req.body[field] ?? null;
  }
}
