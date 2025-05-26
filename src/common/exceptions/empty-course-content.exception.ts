import { InvalidCourseContentException } from './invalid-course-content.exception';

export class EmptyCourseContentException extends InvalidCourseContentException {
  constructor(entityName: string) {
    super(`${entityName} is empty`);
  }
}
