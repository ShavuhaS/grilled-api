import { Type } from '@nestjs/common';
import { Request } from 'express';
import { AppAbility } from './ability-factory.interface';

export interface IPolicyHandler<T extends string> {
  handle(ability: AppAbility<T>, req: Request): boolean | Promise<boolean>;
}

export type PolicyHandlerCallback<T extends string> = (
  ability: AppAbility<T>,
  req: Request,
) => boolean | Promise<boolean>;

export type PolicyHandler<T extends string> =
  | Type<IPolicyHandler<T>>
  | PolicyHandlerCallback<T>;
