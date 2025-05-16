import { Module } from '@nestjs/common';
import { SecurityConfigService } from './services/security-config.service';
import { EmailConfigService } from './services/email-config.service';
import { UrlConfigService } from './services/url-config.service';
import { StorageConfigService } from './services/storage-config.service';
import { MulterConfigService } from './services/multer-config.service';
import { MediaConfigService } from './services/media-config.service';

@Module({
  providers: [
    SecurityConfigService,
    EmailConfigService,
    UrlConfigService,
    StorageConfigService,
    MulterConfigService,
    MediaConfigService,
  ],
  exports: [
    SecurityConfigService,
    EmailConfigService,
    UrlConfigService,
    StorageConfigService,
    MulterConfigService,
    MediaConfigService,
  ],
})
export class ConfigurationModule {}
