import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ConfigurationModule } from '../../config/configuration.module';
import { MulterConfigService } from '../../config/services/multer-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (config: MulterConfigService) => ({
        dest: config.dir || undefined,
        limits: {
          fileSize: config.maxFileSize,
        },
      }),
      inject: [MulterConfigService],
    }),
  ],
  providers: [UploadService],
  exports: [MulterModule, UploadService],
})
export class UploadModule {}
