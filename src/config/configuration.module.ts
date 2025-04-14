import { Module } from '@nestjs/common';
import { SecurityConfigService } from './security-config.service';
import { EmailConfigService } from './email-config.service';
import { UrlConfigService } from './url-config.service';

@Module({
  providers: [SecurityConfigService, EmailConfigService, UrlConfigService],
  exports: [SecurityConfigService, EmailConfigService, UrlConfigService],
})
export class ConfigurationModule {}
