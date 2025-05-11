import { ArticleLessonDto } from './article-lesson.dto';
import { VideoLessonDto } from './video-lesson.dto';
import { TestLessonDto } from './test-lesson.dto';

export type LessonDto =
  | ArticleLessonDto
  | VideoLessonDto
  | TestLessonDto;