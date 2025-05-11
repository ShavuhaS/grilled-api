import { HttpException, HttpStatus } from '@nestjs/common';

export class ParentChildDisconnectionException extends HttpException {
  constructor (parentEntity: string, childEntity: string) {
    super(`${parentEntity} with such id has no ${childEntity} with such id`, HttpStatus.BAD_REQUEST);
  }
}