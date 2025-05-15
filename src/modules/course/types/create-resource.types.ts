import { LessonDto } from '../../../common/dtos/lesson.dto';
import { DbCourseLesson } from '../../../database/entities/course-lesson.entity';

export type CreateResourceContext = {
  courseId: string;
  lesson: LessonDto;
};

export type CreateResourceFunction = (
  dbLesson: DbCourseLesson,
  ctx: CreateResourceContext,
) => Promise<DbCourseLesson>;
