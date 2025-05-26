import { Injectable } from '@nestjs/common';
import { Paginated } from '../../../database/interfaces/paginated.interface';
import { DbSkill } from '../../../database/entities/skill.entity';
import { PaginatedSkillsResponse } from '../../../common/responses/paginated-skills.response';
import { SkillResponse } from '../../../common/responses/skill.response';

@Injectable()
export class SkillMapper {
  constructor() {}

  toPaginatedSkillsResponse({
    data,
    pagination,
  }: Paginated<DbSkill>): PaginatedSkillsResponse {
    return {
      data: data.map((skill) => this.toSkillResponse(skill)),
      pagination,
    };
  }

  toSkillResponse({ id, name }: DbSkill): SkillResponse {
    return { id, name };
  }
}
