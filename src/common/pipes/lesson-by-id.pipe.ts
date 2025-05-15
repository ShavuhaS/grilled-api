import { Injectable, PipeTransform } from '@nestjs/common';
import { CourseLessonRepository } from '../../database/repositories/course-lesson.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class LessonByIdPipe implements PipeTransform {
  constructor (private lessonRepository: CourseLessonRepository) {}

  async transform (id: string): Promise<string> {
    const lesson = await this.lessonRepository.find({ id });

    if (!lesson) {
      throw new InvalidEntityIdException('Lesson');
    }

    return id;
  }
}