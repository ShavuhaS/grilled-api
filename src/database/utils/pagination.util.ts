import { Repository } from '../interfaces/repository.interface';
import { PageDto } from '../../common/dtos/page.dto';
import { Paginated } from '../interfaces/paginated.interface';
import { PaginationResponse } from '../../common/responses/pagination.response';
import { DbPage } from '../types/db-page.type';
import { TInclude, TModels, TOrder, TWhere } from '../types/repository.types';

export type PaginationQuery<Model extends TModels> = {
  where?: TWhere<Model>;
  include?: TInclude<Model>;
  orderBy?: TOrder<Model>;
};

export class PaginationUtil {
  static async paginate<Model extends TModels, Entity>(
    repository: Repository<Model, Entity>,
    query: PaginationQuery<Model>,
    page: PageDto,
  ): Promise<Paginated<Entity>> {
    const totalCount = await repository.count(query.where);
    const totalPages = Math.max(0, Math.ceil(totalCount / page.pageSize));
    page.page = Math.max(1, Math.min(page.page, totalPages));

    const dbPage = this.toDbPage(page);
    const data = await repository.findMany(
      query.where,
      query.include,
      query.orderBy,
      dbPage,
    );

    const pagination: PaginationResponse = {
      page: page.page,
      pageSize: {
        requested: page.pageSize,
        actual: data.length,
      },
      total: {
        elements: totalCount,
        pages: totalPages,
      },
    };

    return { data, pagination };
  }

  private static toDbPage(page: PageDto): DbPage {
    return {
      skip: (page.page - 1) * page.pageSize,
      take: page.pageSize,
    };
  }
}
