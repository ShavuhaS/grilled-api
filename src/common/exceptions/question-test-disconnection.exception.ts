import { ParentChildDisconnectionException } from './parent-child-disconnection.exception';

export class QuestionTestDisconnectionException extends ParentChildDisconnectionException {
  constructor() {
    super('Test', 'question');
  }
}
