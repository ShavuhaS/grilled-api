import {
  ApiBodyOptions,
  ApiParamOptions,
  ApiQueryOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export class ApiDocumentationParams {
  authRequired?: boolean;
  policies?: string[];
  acceptsFile?: boolean;
  ok?: ApiResponseOptions;
  created?: ApiResponseOptions;
  badRequest?: ApiResponseOptions;
  forbidden?: ApiResponseOptions;
  unauthorized?: ApiResponseOptions;
  unsupportedMediaType?: ApiResponseOptions;
  payloadTooLarge?: ApiResponseOptions;
  conflict?: ApiResponseOptions;
  tooManyRequests?: ApiResponseOptions;
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  body?: ApiBodyOptions;
}
