import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiEndpointParams } from '../documentation/types/api-endpoint-params.type';
import { getDocumentationDecorators } from '../documentation/get-documentation-decorators';

export function ApiEndpoint ({
  summary,
  guards,
  documentation,
}: ApiEndpointParams) {
  const decorators = getDocumentationDecorators({ summary, documentation });

  if (guards) {
    decorators.push(UseGuards(...(Array.isArray(guards) ? guards : [guards])));
  }

  return applyDecorators(...decorators);
}
