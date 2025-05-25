import { DbPage } from '../types/db-page.type';
import {
  TBatchPayload,
  TCreate,
  TInclude,
  TModels,
  TOrder,
  TUpdate,
  TWhere,
  TWhereUnique,
} from '../types/repository.types';

export interface Repository<
  Model extends TModels,
  Entity,
  Where = TWhere<Model>,
  WhereUnique = TWhereUnique<Model>,
  Include = TInclude<Model>,
  Order = TOrder<Model>,
  Create = TCreate<Model>,
  Update = TUpdate<Model>,
  BatchPayload = TBatchPayload<Model>,
> {
  count(where?: Where): Promise<number>;
  find(where: WhereUnique, include?: Include): Promise<Entity>;
  findById(id: string, include?: Include): Promise<Entity>;
  findOne(where: Where, include?: Include): Promise<Entity>;
  findMany(
    where: Where,
    include?: Include,
    order?: Order | Order[],
    page?: DbPage,
  ): Promise<Entity[]>;
  create(data: Create, include?: Include): Promise<Entity>;
  createMany(data: Create | Create[]): Promise<BatchPayload>;
  update(where: WhereUnique, data: Update, include?: Include): Promise<Entity>;
  updateById(id: string, data: Update, include?: Include): Promise<Entity>;
  updateMany(where: Where, data: Update): Promise<BatchPayload>;
  delete(where: WhereUnique, include?: Include): Promise<Entity>;
  deleteById(id: string, include?: Include): Promise<Entity>;
  deleteMany(where: Where): Promise<BatchPayload>;
}
