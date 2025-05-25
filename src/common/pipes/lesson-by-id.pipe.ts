import { Injectable } from '@nestjs/common';
import { CourseLessonRepository } from '../../database/repositories/course-lesson.repository';
import { EntityByIdPipe } from './entity-by-id.pipe';

@Injectable()
export class LessonByIdPipe extends EntityByIdPipe {
  constructor(private lessonRepository: CourseLessonRepository) {
    super(lessonRepository, 'Lesson');
  }
}
