import { TestLessonStudentResponse } from './test-lesson-student.response';
import { ArticleLessonStudentResponse } from './article-lesson-student.response';
import { VideoLessonStudentResponse } from './video-lesson-student.response';

export type LessonStudentResponse =
  | TestLessonStudentResponse
  | ArticleLessonStudentResponse
  | VideoLessonStudentResponse;

