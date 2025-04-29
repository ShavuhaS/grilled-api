import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { CourseRepository } from '../../database/repositories/course.repository';

@Injectable()
export class CourseByIdPipe implements PipeTransform {
  constructor (private courseRepository: CourseRepository) {}

  async transform (id: string): Promise<string> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new InvalidEntityIdException('Course');
    }

    return id;
  }
}