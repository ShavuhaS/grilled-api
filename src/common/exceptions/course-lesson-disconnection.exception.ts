import { ParentChildDisconnectionException } from './parent-child-disconnection.exception';

export class CourseLessonDisconnectionException extends ParentChildDisconnectionException {
  constructor() {
    super('Course', 'lesson');
  }
}
