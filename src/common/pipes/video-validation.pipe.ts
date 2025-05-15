import { Injectable, PipeTransform } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as path from 'node:path';
import { FILE_PROCESSED_EVENT } from '../../modules/upload/events/file-processed.event';
import { InvalidFileTypeException } from '../exceptions/invalid-file-type.exception';
import { GIGABYTE } from '../utils/file.constants';
import { FileIsTooLargeException } from '../exceptions/file-is-too-large.exception';

const allowedExtensions = ['.mp4', '.mov', '.mkv', '.webm', '.avi'];

const MAX_VIDEO_SIZE = GIGABYTE;

@Injectable()
export class VideoValidationPipe implements PipeTransform {
  constructor (private eventEmitter: EventEmitter2) {}

  transform (video: Express.Multer.File): Express.Multer.File {
    try {
      const extension = path.extname(video.originalname);

      if (!allowedExtensions.includes(extension)) {
        throw new InvalidFileTypeException();
      }

      if (video.size > MAX_VIDEO_SIZE) {
        throw new FileIsTooLargeException('1GB');
      }

      return video;
    } catch (err) {
      this.eventEmitter.emit(FILE_PROCESSED_EVENT, video);
      throw err;
    }
  }
}