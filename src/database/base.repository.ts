import { Repository } from './interfaces/repository.interface';
import {
  TBatchPayload,
  TCreate,
  TInclude,
  TModels,
  TOrder,
  TUpdate,
  TWhere,
  TWhereUnique,
} from './types/repository.types';
import { DbPage } from './types/db-page.type';
import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository<Model extends TModels, Entity>
  implements Repository<Model, Entity>
{
  protected constructor(
    private client: PrismaClient[Model],
    private repoInclude: TInclude<Model> = {},
  ) {}

  async count(where?: TWhere<Model>): Promise<number> {
    return (this.client as any).count({ where });
  }

  find(
    where: TWhereUnique<Model>,
    include: TInclude<Model> = {},
  ): Promise<Entity> {
    return (this.client as any).findUnique({
      where,
      include: {
        ...this.repoInclude,
        ...include,
      },
    });
  }

  findById(id: string, include: TInclude<Model> = {}): Promise<Entity> {
    return this.find({ id }, include);
  }

  findOne(
    where: TWhere<Model>,
    include: TInclude<Model> = {},
  ): Promise<Entity> {
    return (this.client as any).findFirst({
      where,
      include: {
        ...this.repoInclude,
        ...include,
      },
    });
  }

  findMany(
    where: TWhere<Model>,
    include: TInclude<Model> = {},
    order: TOrder<Model>[] | TOrder<Model> = {},
    page: DbPage = {},
  ): Promise<Entity[]> {
    return (this.client as any).findMany({
      where,
      include: {
        ...this.repoInclude,
        ...include,
      },
      orderBy: order,
      ...page,
    });
  }

  create(data: TCreate<Model>, include: TInclude<Model> = {}): Promise<Entity> {
    return (this.client as any).create({
      data,
      include: {
        ...this.repoInclude,
        ...include,
      },
    });
  }

  createMany(
    data: TCreate<Model>[] | TCreate<Model>,
  ): Promise<TBatchPayload<Model>> {
    return (this.client as any).createMany({ data });
  }

  update(
    where: TWhereUnique<Model>,
    data: TUpdate<Model>,
    include: TInclude<Model> = {},
  ): Promise<Entity> {
    return (this.client as any).update({
      where,
      data,
      include: {
        ...this.repoInclude,
        ...include,
      },
    });
  }

  updateById(
    id: string,
    data: TUpdate<Model>,
    include?: TInclude<Model>,
  ): Promise<Entity> {
    return (this.client as any).update({
      where: { id },
      data,
      include: {
        ...this.repoInclude,
        ...include,
      },
    });
  }

  updateMany(
    where: TWhere<Model>,
    data: TUpdate<Model>,
  ): Promise<TBatchPayload<Model>> {
    return (this.client as any).updateMany({ where, data });
  }

  delete(
    where: TWhereUnique<Model>,
    include: TInclude<Model> = {},
  ): Promise<Entity> {
    return (this.client as any).delete({
      where,
      include: {
        ...this.repoInclude,
        ...include,
      },
    });
  }

  deleteById(id: string, include?: TInclude<Model>): Promise<Entity> {
    return (this.client as any).delete({
      where: { id },
      include: {
        ...this.repoInclude,
        ...include,
      },
    });
  }

  deleteMany(where: TWhere<Model>): Promise<TBatchPayload<Model>> {
    return (this.client as any).deleteMany({ where });
  }
}
