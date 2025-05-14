import { DbCourse } from './course.entity';
import { DbCourseLesson } from './course-lesson.entity';

export class DbCourseModule {
  id: string;
  courseId: string;
  course?: DbCourse;
  name: string;
  order: number;
  estimatedTime: number;
  createdAt?: Date;
  updatedAt?: Date;
  lessons?: DbCourseLesson[];
}
