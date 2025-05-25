import { HttpException, HttpStatus } from '@nestjs/common';

export class FileIsTooLargeException extends HttpException {
  constructor(maxSize: string) {
    super(
      `File is too large (maximum size: ${maxSize})`,
      HttpStatus.PAYLOAD_TOO_LARGE,
    );
  }
}
