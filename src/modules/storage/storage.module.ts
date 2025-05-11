import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigurationModule } from '../../config/configuration.module';

@Module({
  providers: [StorageService],
  exports: [StorageService],
  imports: [ConfigurationModule],
})
export class StorageModule {}
