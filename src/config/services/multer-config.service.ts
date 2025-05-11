import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MulterConfigService {
  constructor (private configService: ConfigService) {}

  get dir (): string {
    return this.configService.get<string>('multer.dir');
  }
}