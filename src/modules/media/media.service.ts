import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'node:fs/promises';
import * as crypto from 'node:crypto';
import { join, extname } from 'node:path';
import { tmpdir } from 'os';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MediaConfigService } from '../../config/services/media-config.service';

@Injectable()
export class MediaService {
  constructor (
    private mediaConfig: MediaConfigService,
    private eventEmitter: EventEmitter2,
  ) {
    if (mediaConfig.ffmpegPath) {
      ffmpeg.setFfmpegPath(mediaConfig.ffmpegPath);
    }
    if (mediaConfig.ffprobePath) {
      ffmpeg.setFfprobePath(mediaConfig.ffprobePath);
    }
  }

  async getVideoDuration (video: Express.Multer.File): Promise<number> {
    if (video.buffer) {
      const extension = extname(video.originalname);
      const fileName = `${crypto.randomUUID()}${extension}`;
      const filePath = join(tmpdir(), fileName);

      await fs.writeFile(filePath, video.buffer);

      return await this.getVideoDurationFromFile(filePath);
    }

    return this.getVideoDurationFromFile(video.path);
  }

  private async getVideoDurationFromFile (path: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg(path).ffprobe((err, metadata) => {
        if (err) reject(err);
        resolve(metadata.format.duration);
      });
    });
  }
}
