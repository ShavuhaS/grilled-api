import { IPolicyHandler } from '../../interfaces/policy-handler.interface';
import { TeacherAction } from '../../../../common/enums/teacher-action.enum';
import { TeacherRepository } from '../../../../database/repositories/teacher.repository';
import { AppAbility } from '../../interfaces/ability-factory.interface';
import { Request } from 'express';
import { DbUser } from '../../../../database/entities/user.entity';
import { ForbiddenException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DbTeacher } from '../../../../database/entities/teacher.entity';

export abstract class TeacherBaseMePolicy
  implements IPolicyHandler<TeacherAction>
{
  protected constructor(
    private repo: TeacherRepository,
    private action: TeacherAction,
  ) {}

  async handle(
    ability: AppAbility<TeacherAction>,
    req: Request,
  ): Promise<boolean> {
    const user = req.user as DbUser;
    const teacher = await this.repo.find({ userId: user.id });

    if (!teacher) {
      throw new ForbiddenException();
    }

    return ability.can(this.action, plainToInstance(DbTeacher, teacher));
  }
}
