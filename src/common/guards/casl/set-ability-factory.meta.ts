import { SetMetadata, Type } from '@nestjs/common';
import { AbilityFactory } from '../../../modules/casl/interfaces/ability-factory.interface';

export const ABILITY_FACTORY_KEY = 'ability_factory_key';

export const SetAbilityFactory = (factoryType: Type<AbilityFactory<any>>) => SetMetadata(ABILITY_FACTORY_KEY, factoryType);