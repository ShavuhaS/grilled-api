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
import { PublishDocumentation } from './publish';
import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { CheckEditableDocumentation } from './check-editable';
import { CompleteLessonDocumentation } from './complete-lesson';
import { UpdateDocumentation } from './update';
import { UpdateAvatarDocumentation } from './update-avatar';
import { GetAllDocumentation } from './get-all';
import { UpdateModuleDocumentation } from './update-module';
import { GetTestDocumentation } from './get-test';

export const CourseDocumentation = {
  GET: GetDocumentation,
  GET_ALL: GetAllDocumentation,
  CREATE: CreateDocumentation,
  UPDATE: UpdateDocumentation,
  UPDATE_AVATAR: UpdateAvatarDocumentation,
  CREATE_MODULE: CreateModuleDocumentation,
  UPDATE_MODULE: UpdateModuleDocumentation,
  GET_LESSON: GetLessonDocumentation,
  CREATE_LESSON: CreateLessonDocumentation,
  UPDATE_LESSON: UpdateLessonDocumentation,
  DELETE_LESSON: DeleteLessonDocumentation,
  UPLOAD_VIDEO: UploadVideoDocumentation,
  UPDATE_ARTICLE: UpdateArticleDocumentation,
  GET_TEST: GetTestDocumentation,
  CHECK_EDITABLE: CheckEditableDocumentation,
  PUBLISH: PublishDocumentation,
  ENROLL: EnrollDocumentation,
  COMPLETE_LESSON: CompleteLessonDocumentation,
} satisfies Record<string, ApiDocumentationParams>;
