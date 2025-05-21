import { PipeTransform } from '@nestjs/common';
import { Repository } from '../../database/interfaces/repository.interface';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

export class EntityByIdPipe<T = any> implements PipeTransform {
  constructor (
    protected readonly repository: Repository<T>,
    protected readonly entityName: string,
  ) {}

  async transform (value: string[] | string): Promise<any> {
    if (Array.isArray(value)) {
      return this.transformArray(value);
    }
    return this.transformId(value);
  }

  async transformArray (ids: string[]): Promise<string[]> {
    for (const id of ids) {
      await this.transformId(id);
    }
    return ids;
  }

  async transformId (id: string): Promise<string> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new InvalidEntityIdException(this.entityName);
    }

    return id;
  }

}