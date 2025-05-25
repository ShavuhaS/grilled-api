import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'node:path';
import { InvalidFileTypeException } from '../exceptions/invalid-file-type.exception';
import { GIGABYTE } from '../utils/file.constants';
import { FileIsTooLargeException } from '../exceptions/file-is-too-large.exception';
import { NoFileException } from '../exceptions/no-file.exception';

const allowedExtensions = ['.mp4', '.mov', '.mkv', '.webm', '.avi'];

const MAX_VIDEO_SIZE = GIGABYTE;

@Injectable()
export class VideoValidationPipe implements PipeTransform {
  constructor() {}

  transform(video: Express.Multer.File): Express.Multer.File {
    if (!video) {
      throw new NoFileException();
    }
    const extension = path.extname(video.originalname);

    if (!allowedExtensions.includes(extension)) {
      throw new InvalidFileTypeException();
    }

    if (video.size > MAX_VIDEO_SIZE) {
      throw new FileIsTooLargeException('1GB');
    }

    return video;
  }
}
