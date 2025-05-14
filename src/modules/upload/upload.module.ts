import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get<string>('multer.dir') || undefined,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MulterModule],
})
export class UploadModule {}
