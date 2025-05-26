import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCourseContentException extends HttpException {
  constructor(suffix?: string) {
    let message = 'Course content is invalid';
    if (suffix) {
      message = message + '. ' + suffix;
    }
    super(message, HttpStatus.BAD_REQUEST);
  }
}
