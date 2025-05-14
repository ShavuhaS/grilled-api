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

@Injectable()
export class CourseUpdatePolicy implements IPolicyHandler<CourseAction> {
  constructor (private courseRepository: CourseRepository) {}

  async handle (
    ability: AppAbility<CourseAction>,
    req: Request,
  ): Promise<boolean> {
    const courseId = RequestUtils.get<string>(req, 'courseId');
    const course = await this.courseRepository.findById(courseId);

    if (!course) {
      throw new InvalidEntityIdException('Course');
    }

    return ability.can(CourseAction.UPDATE, plainToInstance(DbCourse, course));
  }
}
