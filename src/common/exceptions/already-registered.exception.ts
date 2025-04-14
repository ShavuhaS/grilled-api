import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyRegisteredException extends HttpException {
  constructor () {
    super(
      'User with such credentials is already registered',
      HttpStatus.BAD_REQUEST,
    );
  }
}
