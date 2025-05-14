import { DbCourseLesson } from './course-lesson.entity';
import { DbTestQuestion } from './test-question.entity';
import { DbTestResult } from './test-result.entity';

export class DbLessonTest {
  id: string;
  lessonId: string;
  lesson?: DbCourseLesson;
  questionCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  questions?: DbTestQuestion[];
  results?: DbTestResult[];
}
