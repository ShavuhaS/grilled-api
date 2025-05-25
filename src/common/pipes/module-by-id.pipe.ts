import { Injectable } from '@nestjs/common';
import { CourseModuleRepository } from '../../database/repositories/course-module.repository';
import { EntityByIdPipe } from './entity-by-id.pipe';

@Injectable()
export class ModuleByIdPipe extends EntityByIdPipe {
  constructor(private moduleRepository: CourseModuleRepository) {
    super(moduleRepository, 'Module');
  }
}
