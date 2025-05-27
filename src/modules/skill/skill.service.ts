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

  async getAll(
    query: QuerySkillsDto,
    orderBy: OrderByDto,
  ): Promise<Paginated<DbSkill>> {
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

  async addFolower(ids: string[], userId: string) {
    const userSkills = await this.getFollowedBy(userId);
    const userSkillSet = new Set(userSkills.map(({ id }) => id));

    const toAdd = [];
    for (const id of ids) {
      if (!userSkillSet.has(id)) {
        toAdd.push(id);
      }
    }

    for (const id of toAdd) {
      await this.skillRepository.updateById(id, {
        followers: { create: { userId } },
      });
    }
  }

  async removeFolower(ids: string[], userId: string) {
    const userSkills = await this.getFollowedBy(userId);
    const userSkillSet = new Set(userSkills.map(({ id }) => id));

    const toRemove = [];
    for (const id of ids) {
      if (userSkillSet.has(id)) {
        toRemove.push(id);
      }
    }

    for (const id of toRemove) {
      await this.skillRepository.updateById(id, {
        followers: {
          delete: {
            userId_skillId: {
              userId,
              skillId: id,
            },
          },
        },
      });
    }
  }

  async getFollowedBy(userId: string): Promise<DbSkill[]> {
    return this.skillRepository.findMany({
      followers: { some: { userId } },
    });
  }
}
