import { ApiDocumentationParams } from './api-documentation-params.type';
import { PolicyHandler } from '../../../modules/casl/interfaces/policy-handler.interface';

export class ApiEndpointParams {
  summary: string;
  guards?: any | any[];
  policies?: PolicyHandler<any> | PolicyHandler<any>[];
  documentation?: ApiDocumentationParams;
}
