import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { CourseModuleRepository } from '../../database/repositories/course-module.repository';

@Injectable()
export class ModuleByIdPipe implements PipeTransform {
  constructor (private moduleRepository: CourseModuleRepository) {}

  async transform (id: string): Promise<string> {
    const module = await this.moduleRepository.findById(id);

    if (!module) {
      throw new InvalidEntityIdException('Module');
    }

    return id;
  }
}