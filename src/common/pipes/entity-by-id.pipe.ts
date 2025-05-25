import { PipeTransform } from '@nestjs/common';
import { Repository } from '../../database/interfaces/repository.interface';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

export class EntityByIdPipe implements PipeTransform {
  constructor(
    protected readonly repository: Repository<any, any>,
    protected readonly entityName: string,
  ) {}

  async transform(value: string[] | string): Promise<any> {
    if (Array.isArray(value)) {
      return this.transformArray(value);
    }
    return this.transformId(value);
  }

  async transformArray(ids: string[]): Promise<string[]> {
    const count = await this.repository.count({
      id: { in: ids },
    });

    if (count < ids.length) {
      throw new InvalidEntityIdException(this.entityName);
    }

    return ids;
  }

  async transformId(id: string): Promise<string> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new InvalidEntityIdException(this.entityName);
    }

    return id;
  }
}
