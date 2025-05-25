import { Injectable } from '@nestjs/common';
import { SkillRepository } from '../../database/repositories/skill.repository';
import { Paginated } from '../../database/interfaces/paginated.interface';
import { DbSkill } from '../../database/entities/skill.entity';
import { PageDto } from '../../common/dtos/page.dto';
import { PaginationUtil } from '../../database/utils/pagination.util';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { QuerySkillsDto } from '../../common/dtos/query-skills.dto';
import { SearchUtil } from '../../database/utils/search.util';

@Injectable()
export class SkillService {
  constructor(private skillRepository: SkillRepository) {}

  async getAll(query: QuerySkillsDto, orderBy: OrderByDto<DbSkill>): Promise<Paginated<DbSkill>> {
    let where = {};

    if (query.search) {
      where = SearchUtil.getFieldSearch<'skill'>(query.search, 'name');
    }

    return PaginationUtil.paginate<'skill', DbSkill>(
      this.skillRepository,
      { where, orderBy },
      query as PageDto,
    );
  }
}
