import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityTypeException extends HttpException {
  constructor(entityName: string) {
    super(`Invalid ${entityName} type`, HttpStatus.BAD_REQUEST);
  }
}
