import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { ConfigurationModule } from '../../config/configuration.module';

@Module({
  providers: [MediaService],
  exports: [MediaService],
  imports: [ConfigurationModule],
})
export class MediaModule {}
