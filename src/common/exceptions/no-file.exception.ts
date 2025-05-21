import { HttpException, HttpStatus } from '@nestjs/common';

export class NoFileException extends HttpException {
  constructor () {
    super('No file provided', HttpStatus.BAD_REQUEST);
  }
}