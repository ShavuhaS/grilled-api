import { PolicyHandler } from '../../../modules/casl/interfaces/policy-handler.interface';
import { SetMetadata } from '@nestjs/common';

export const CHECK_POLICIES_KEY = 'check_policies';

export const SetPolicies = (...handlers: PolicyHandler<any>[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);