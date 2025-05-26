import { IPolicyHandler } from '../../interfaces/policy-handler.interface';
import { CourseAction } from '../../actions/course-action.enum';
import { AppAbility } from '../../interfaces/ability-factory.interface';
import { Request } from 'express';
import { CourseRepository } from '../../../../database/repositories/course.repository';
import { RequestUtils } from '../../../../common/utils/request.utils';
import { plainToInstance } from 'class-transformer';
import { DbCourse } from '../../../../database/entities/course.entity';
import { InvalidEntityIdException } from '../../../../common/exceptions/invalid-entity-id.exception';

export abstract class BaseCoursePolicy implements IPolicyHandler<CourseAction> {
  protected constructor(
    private repo: CourseRepository,
    protected action: CourseAction,
  ) {}

  async handle(
    ability: AppAbility<CourseAction>,
    req: Request,
  ): Promise<boolean> {
    const courseId = RequestUtils.get<string>(req, 'courseId');
    const course = await this.repo.findById(courseId);

    if (!course) {
      throw new InvalidEntityIdException('Course');
    }

    return ability.can(this.action, plainToInstance(DbCourse, course));
  }
}
