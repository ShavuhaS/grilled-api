import { LessonDto } from '../../../common/dtos/lesson.dto';
import { DbCourseLesson } from '../../../database/entities/course-lesson.entity';

export type CreateResourceOptions = {
  courseId: string;
  lesson: LessonDto;
};

export type CreateResourceFunction = (
  dbLesson: DbCourseLesson,
  options: CreateResourceOptions,
) => Promise<DbCourseLesson>;
