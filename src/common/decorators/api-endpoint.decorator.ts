import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiEndpointParams } from '../documentation/types/api-endpoint-params.type';
import { getDocumentationDecorators } from '../documentation/get-documentation-decorators';
import { JwtGuard } from '../guards/auth/jwt.guard';
import { SetPolicies } from '../guards/casl/set-policies.meta';
import { PolicyGuard } from '../guards/casl/policy.guard';

export function ApiEndpoint({
  summary,
  guards,
  policies,
  documentation,
}: ApiEndpointParams) {
  const decorators = getDocumentationDecorators({ summary, documentation });

  if (guards === undefined) {
    guards = [];
  } else {
    guards = Array.isArray(guards) ? guards : [guards];
  }

  if (policies !== undefined) {
    policies = Array.isArray(policies) ? policies : [policies];
    decorators.push(SetPolicies(...policies));
    guards.push(JwtGuard);
    guards.push(PolicyGuard);
  }

  const jwtIndex = guards.indexOf(JwtGuard);
  if (jwtIndex !== -1) {
    [guards[0], guards[jwtIndex]] = [guards[jwtIndex], guards[0]];
  }

  if (guards.length !== 0) {
    decorators.push(UseGuards(...guards));
  }

  return applyDecorators(...decorators);
}
