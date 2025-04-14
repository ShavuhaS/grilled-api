import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlConfigService {
  constructor (private configService: ConfigService) {}

  get base (): string {
    return this.configService.get<string>('baseUrl');
  }

  get front (): string {
    return this.configService.get<string>('frontBaseUrl');
  }
}
