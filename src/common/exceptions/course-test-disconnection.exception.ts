import { ParentChildDisconnectionException } from './parent-child-disconnection.exception';

export class CourseTestDisconnectionException extends ParentChildDisconnectionException {
  constructor() {
    super('Course', 'test');
  }
}
