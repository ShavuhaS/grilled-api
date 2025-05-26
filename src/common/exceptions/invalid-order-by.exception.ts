import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidOrderByException extends HttpException {
  constructor() {
    super('Invalid order by statement', HttpStatus.BAD_REQUEST);
  }
}
