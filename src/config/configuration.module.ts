import { Module } from '@nestjs/common';
import { SecurityConfigService } from './services/security-config.service';
import { EmailConfigService } from './services/email-config.service';
import { UrlConfigService } from './services/url-config.service';
import { StorageConfigService } from './services/storage-config.service';
import { MulterConfigService } from './services/multer-config.service';

@Module({
  providers: [
    SecurityConfigService,
    EmailConfigService,
    UrlConfigService,
    StorageConfigService,
    MulterConfigService,
  ],
  exports: [
    SecurityConfigService,
    EmailConfigService,
    UrlConfigService,
    StorageConfigService,
    MulterConfigService,
  ],
})
export class ConfigurationModule {}
