import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityIdException extends HttpException {
  constructor(entityName: string) {
    super(`${entityName} with such id was not found`, HttpStatus.BAD_REQUEST);
  }
}
