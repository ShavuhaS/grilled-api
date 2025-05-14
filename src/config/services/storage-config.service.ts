import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageConfigService {
  constructor (private configService: ConfigService) {}

  get credential (): string {
    return this.configService.get<string>('storage.credential');
  }

  get bucket (): string {
    return this.configService.get<string>('storage.bucket');
  }

  get signatureTtl (): number {
    return parseInt(this.configService.get<string>('storage.signatureTtl'));
  }
}
