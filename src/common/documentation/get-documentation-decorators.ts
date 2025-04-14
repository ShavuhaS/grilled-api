import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiQuery,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';

import { ApiDocumentationParams } from './types/api-documentation-params.type';

type DocDecoratorParams = {
  summary: string;
  description?: string;
  documentation?: ApiDocumentationParams;
};

export function getDocumentationDecorators ({
  summary,
  description,
  documentation,
}: DocDecoratorParams) {
  const responseTypes = [
    { key: 'ok', decorator: ApiOkResponse },
    { key: 'badRequest', decorator: ApiBadRequestResponse },
    { key: 'forbidden', decorator: ApiForbiddenResponse },
    { key: 'unauthorized', decorator: ApiUnauthorizedResponse },
    { key: 'unsupportedMediaType', decorator: ApiUnsupportedMediaTypeResponse },
    { key: 'payloadTooLarge', decorator: ApiPayloadTooLargeResponse },
    { key: 'conflict', decorator: ApiConflictResponse },
    { key: 'tooManyRequests', decorator: ApiTooManyRequestsResponse },
  ];

  const decorators = [ApiOperation({ summary, description })];

  if (documentation?.authRequired) {
    decorators.push(ApiBearerAuth());
  }

  if (documentation?.acceptsFile) {
    decorators.push(ApiConsumes('multipart/form-data'));
  }

  decorators.push(
    ...responseTypes
      .filter(({ key }) => documentation?.[key])
      .map(({ key, decorator }) => decorator(documentation[key])),
  );

  if (documentation?.params) {
    decorators.push(...documentation.params.map((query) => ApiParam(query)));
  }

  if (documentation?.queries) {
    decorators.push(...documentation.queries.map((query) => ApiQuery(query)));
  }

  if (documentation?.body) {
    decorators.push(ApiBody(documentation.body));
  }

  return decorators;
}
