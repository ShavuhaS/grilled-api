import { DbCourseModule } from './course-module.entity';
import { LessonTypeEnum } from '../../common/enums/lesson-type.enum';
import { DbLessonResource } from './lesson-resource.entity';
import { DbCompletedLesson } from './completed-lesson.entity';
import { DbLessonTest } from './lesson-test.entity';

export class DbCourseLesson {
  id: string;
  moduleId: string;
  module?: DbCourseModule;
  name: string;
  order: number;
  type: LessonTypeEnum;
  estimatedTime: number;
  createdAt?: Date;
  updatedAt?: Date;
  test?: DbLessonTest;
  resources?: DbLessonResource[];
  completedBy?: DbCompletedLesson[];
}
