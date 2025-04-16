import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfigService {
  constructor (private configService: ConfigService) {}

  get accessSecret (): string {
    return this.configService.get<string>('security.secret.access');
  }

  get refreshSecret (): string {
    return this.configService.get<string>('security.secret.refresh');
  }

  get accessTtl (): string {
    return this.configService.get<string>('security.jwt.ttl');
  }

  get refreshTtl (): string {
    return this.configService.get<string>('security.jwt.refreshTtl');
  }
}
