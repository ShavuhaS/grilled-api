import { ParentChildDisconnectionException } from './parent-child-disconnection.exception';

export class QuestionAnswerDisconnectionException extends ParentChildDisconnectionException {
  constructor() {
    super('Test question', 'answer');
  }
}
