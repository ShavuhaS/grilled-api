import { CreateDocumentation } from './create';
import { EnrollDocumentation } from './enroll';
import { CreateModuleDocumentation } from './create-module';
import { GetDocumentation } from './get';
import { CreateLessonDocumentation } from './create-lesson';
import { UploadVideoDocumentation } from './upload-video';
import { DeleteLessonDocumentation } from './delete-lesson';
import { GetLessonDocumentation } from './get-lesson';
import { UpdateArticleDocumentation } from './update-article';
import { UpdateLessonDocumentation } from './update-lesson';

export const CourseDocumentation = {
  GET: GetDocumentation,
  CREATE: CreateDocumentation,
  CREATE_MODULE: CreateModuleDocumentation,
  GET_LESSON: GetLessonDocumentation,
  CREATE_LESSON: CreateLessonDocumentation,
  UPDATE_LESSON: UpdateLessonDocumentation,
  DELETE_LESSON: DeleteLessonDocumentation,
  UPLOAD_VIDEO: UploadVideoDocumentation,
  UPDATE_ARTICLE: UpdateArticleDocumentation,
  ENROLL: EnrollDocumentation,
};
