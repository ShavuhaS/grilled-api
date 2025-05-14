import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Type,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import {
  IPolicyHandler,
  PolicyHandler,
  PolicyHandlerCallback,
} from '../../../modules/casl/interfaces/policy-handler.interface';
import { CHECK_POLICIES_KEY } from './set-policies.meta';
import { everyAsync } from '../../utils/async.utils';
import { DbUser } from '../../../database/entities/user.entity';
import { ABILITY_FACTORY_KEY } from './set-ability-factory.meta';
import { AbilityFactory } from '../../../modules/casl/interfaces/ability-factory.interface';
import { isClass } from '../../utils/object.utils';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate (ctx: ExecutionContext): Promise<boolean> {
    const handlers = this.reflector.get<PolicyHandler<any>[]>(
      CHECK_POLICIES_KEY,
      ctx.getHandler(),
    );
    const factoryType =
      this.reflector.get<Type<any>>(ABILITY_FACTORY_KEY, ctx.getHandler()) ||
      this.reflector.get<Type<any>>(ABILITY_FACTORY_KEY, ctx.getClass());

    if (!factoryType) {
      throw new Error('No ability factory assigned to this controller/route');
    }

    const abilityFactory = this.moduleRef.get<AbilityFactory<any>>(
      factoryType,
      { strict: false },
    );

    const req = ctx.switchToHttp().getRequest();
    const user = req.user as DbUser;
    const ability = await Promise.resolve(abilityFactory.createForUser(user));

    return everyAsync(handlers, (handler) => {
      if (isClass(handler)) {
        const policyHandler = this.moduleRef.get<IPolicyHandler<any>>(handler, {
          strict: false,
        });
        return policyHandler.handle(ability, req);
      } else {
        return (handler as PolicyHandlerCallback<any>)(ability, req);
      }
    });
  }
}
