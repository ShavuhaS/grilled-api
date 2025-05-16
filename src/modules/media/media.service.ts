import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'node:fs/promises';
import * as crypto from 'node:crypto';
import { join, extname } from 'node:path';
import { tmpdir } from 'os';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FILE_PROCESSED_EVENT } from '../upload/events/file-processed.event';
import { MediaConfigService } from '../../config/services/media-config.service';
import { FileProcessedEvent } from '../../common/events/file-processed.event';

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

      try {
        await fs.writeFile(filePath, video.buffer);
        return await this.getVideoDurationFromFile(filePath);
      } finally {
        this.eventEmitter.emit(FILE_PROCESSED_EVENT, new FileProcessedEvent(filePath));
      }
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
