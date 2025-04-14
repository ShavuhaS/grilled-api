import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadySentException extends HttpException {
  constructor () {
    super(
      'Email verification email has already been sent',
      HttpStatus.BAD_REQUEST,
    );
  }
}
