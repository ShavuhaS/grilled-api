import { ParentChildDisconnectionException } from './parent-child-disconnection.exception';

export class CourseModuleDisconnectionException extends ParentChildDisconnectionException {
  constructor () {
    super('Course', 'module');
  }
}