import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileTypeException extends HttpException {
  constructor() {
    super('Unsupported file extension', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
