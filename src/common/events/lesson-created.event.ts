import { DbCourseLesson } from '../../database/entities/course-lesson.entity';

export class LessonCreatedEvent {
  lesson: DbCourseLesson;

  constructor (lesson: DbCourseLesson) {
    this.lesson = lesson;
  }
}