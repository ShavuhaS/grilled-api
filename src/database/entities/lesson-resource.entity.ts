import { DbCourseLesson } from './course-lesson.entity';
import { ResourceTypeEnum } from '../../common/enums/resource-type.enum';

export class DbLessonResource {
  id: string;
  lessonId: string;
  lesson?: DbCourseLesson;
  name?: string;
  link: string;
  type: ResourceTypeEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
