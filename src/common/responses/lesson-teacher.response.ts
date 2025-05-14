import { ArticleLessonTeacherResponse } from './article-lesson-teacher.response';
import { VideoLessonTeacherResponse } from './video-lesson-teacher.response';
import { TestLessonTeacherResponse } from './test-lesson-teacher.response';

export type LessonTeacherResponse =
  | ArticleLessonTeacherResponse
  | VideoLessonTeacherResponse
  | TestLessonTeacherResponse;