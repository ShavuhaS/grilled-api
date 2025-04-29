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

  get accessTtl (): number {
    return this.configService.get<number>('security.jwt.ttl');
  }

  get accessTtlStr (): string {
    const ttl = this.accessTtl;
    return `${ttl}s`;
  }

  get refreshTtl (): number {
    return this.configService.get<number>('security.jwt.refreshTtl');
  }

  get refreshTtlStr (): string {
    const ttl = this.refreshTtl;
    return `${ttl}s`;
  }
}
