import { InvalidCourseContentException } from './invalid-course-content.exception';

export class InvalidTestAnswersException extends InvalidCourseContentException {
  constructor() {
    super('Invalid test question answer configuration');
  }
}
