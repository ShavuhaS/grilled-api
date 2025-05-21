import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IPolicyHandler } from '../../interfaces/policy-handler.interface';
import { CourseAction } from '../../actions/course-action.enum';
import { CourseRepository } from '../../../../database/repositories/course.repository';
import { AppAbility } from '../../interfaces/ability-factory.interface';
import { RequestUtils } from '../../../../common/utils/request.utils';
import { InvalidEntityIdException } from '../../../../common/exceptions/invalid-entity-id.exception';
import { plainToInstance } from 'class-transformer';
import { DbCourse } from '../../../../database/entities/course.entity';

@Injectable()
export class CourseAccessContentPolicy implements IPolicyHandler<CourseAction> {
  constructor (private courseRepository: CourseRepository) {}

  async handle (ability: AppAbility<CourseAction>, req: Request): Promise<boolean> {
    const courseId = RequestUtils.get<string>(req, 'courseId');
    const course = await this.courseRepository.findById(courseId);

    if (!course) {
      throw new InvalidEntityIdException('Course');
    }

    return ability.can(CourseAction.ACCESS_CONTENT, plainToInstance(DbCourse, course));
  }
}