import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotConfirmedException extends HttpException {
  constructor () {
    super('Email has not been confirmed', HttpStatus.UNAUTHORIZED);
  }
}
