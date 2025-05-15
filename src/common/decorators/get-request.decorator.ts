import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRequest = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req?.[property];
  },
);
