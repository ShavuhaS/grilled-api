import { CreateDocumentation } from './create';
import { EnrollDocumentation } from './enroll';
import { CreateModuleDocumentation } from './create-module';
import { GetDocumentation } from './get';
import { CreateLessonDocumentation } from './create-lesson';

export const CourseDocumentation = {
  GET: GetDocumentation,
  CREATE: CreateDocumentation,
  CREATE_MODULE: CreateModuleDocumentation,
  CREATE_LESSON: CreateLessonDocumentation,
  ENROLL: EnrollDocumentation,
};
