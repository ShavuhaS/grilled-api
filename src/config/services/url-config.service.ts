import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlConfigService {
  private _domain: string;

  constructor(private configService: ConfigService) {}

  get base(): string {
    return this.configService.get<string>('baseUrl');
  }

  get domain(): string {
    if (this._domain !== undefined) {
      return this._domain;
    }

    const domainStart = this.base.indexOf('//') + 2;
    const domain = this.base.slice(domainStart);
    const domainEnd = domain.lastIndexOf(':');
    this._domain = domainEnd === -1 ? domain : domain.slice(0, domainEnd);

    if (this._domain === 'localhost') {
      this._domain = '';
    }

    return this._domain;
  }

  get front(): string {
    return this.configService.get<string>('frontBaseUrl');
  }
}
