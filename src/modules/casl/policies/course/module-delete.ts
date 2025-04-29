import { Injectable } from '@nestjs/common';
import { IPolicyHandler } from '../../interfaces/policy-handler.interface';
import { CourseAction } from '../../actions/course-action.enum';
import { AppAbility } from '../../interfaces/ability-factory.interface';
import { Request } from 'express';
import { CourseRepository } from '../../../../database/repositories/course.repository';
import { RequestUtils } from '../../../../common/utils/request.utils';
import { plainToInstance } from 'class-transformer';
import { DbCourse } from '../../../../database/entities/course.entity';
import { InvalidEntityIdException } from '../../../../common/exceptions/invalid-entity-id.exception';
import { CourseModuleRepository } from '../../../../database/repositories/course-module.repository';

@Injectable()
export class ModuleDeletePolicy implements IPolicyHandler<CourseAction> {
  constructor (private moduleRepository: CourseModuleRepository) {}

  async handle (ability: AppAbility<CourseAction>, req: Request): Promise<boolean> {
    const moduleId = RequestUtils.get<string>(req, 'moduleId');
    const module = await this.moduleRepository.findById(moduleId, {
      course: true,
    });

    if (!module) {
      throw new InvalidEntityIdException('Module');
    }

    return ability.can(CourseAction.UPDATE, plainToInstance(DbCourse, module.course));
  }
}