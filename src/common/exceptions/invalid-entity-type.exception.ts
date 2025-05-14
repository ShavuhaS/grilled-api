import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityTypeException extends HttpException {
  constructor (entityName: string) {
    super(`Invalid ${entityName} type provided`, HttpStatus.BAD_REQUEST);
  }
}
