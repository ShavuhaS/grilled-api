import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityIndexException extends HttpException {
  constructor (entityName: string) {
    super(`Invalid ${entityName} array index`, HttpStatus.BAD_REQUEST);
  }
}
