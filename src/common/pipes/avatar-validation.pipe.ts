import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'node:path';
import { InvalidFileTypeException } from '../exceptions/invalid-file-type.exception';
import { MEGABYTE } from '../utils/file.constants';
import { FileIsTooLargeException } from '../exceptions/file-is-too-large.exception';
import { NoFileException } from '../exceptions/no-file.exception';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

const MAX_AVATAR_SIZE = 5 * MEGABYTE;

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  constructor() {}

  transform(avatar: Express.Multer.File): Express.Multer.File {
    if (!avatar) {
      throw new NoFileException();
    }
    const extension = path.extname(avatar.originalname).toLowerCase();

    if (
      !allowedExtensions.includes(extension) ||
      !allowedMimeTypes.includes(avatar.mimetype)
    ) {
      throw new InvalidFileTypeException();
    }

    if (avatar.size > MAX_AVATAR_SIZE) {
      throw new FileIsTooLargeException('5MB');
    }

    return avatar;
  }
}
