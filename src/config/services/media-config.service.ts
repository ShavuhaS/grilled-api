import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaConfigService {
  constructor(private configService: ConfigService) {}

  get ffmpegPath(): string {
    return this.configService.get<string>('ffmpeg.path.ffmpeg');
  }

  get ffprobePath(): string {
    return this.configService.get<string>('ffmpeg.path.ffprobe');
  }
}
