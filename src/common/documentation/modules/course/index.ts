import { CreateDocumentation } from './create';
import { EnrollDocumentation } from './enroll';
import { CreateModuleDocumentation } from './create-module';
import { GetDocumentation } from './get';

export const CourseDocumentation = {
  GET: GetDocumentation,
  CREATE: CreateDocumentation,
  CREATE_MODULE: CreateModuleDocumentation,
  ENROLL: EnrollDocumentation,
};