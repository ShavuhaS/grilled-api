import { ApiDocumentationParams } from './api-documentation-params.type';

export class ApiEndpointParams {
  summary: string;
  guards?: any | any[];
  documentation?: ApiDocumentationParams;
}
