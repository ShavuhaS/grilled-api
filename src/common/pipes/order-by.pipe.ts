import { PipeTransform } from '@nestjs/common';
import { Sortable } from '../../database/interfaces/sortable.interface';
import { OrderByDto } from '../dtos/order-by.dto';
import { SortOrder } from '../enums/sort-order.enum';
import { apiToEntityMap } from '../utils/entity-field-map.constant';

export class OrderByPipe<T extends Sortable<T>> implements PipeTransform {
  constructor(private cls: new () => T) {}

  transform(value: string): OrderByDto {
    const orderBy: OrderByDto = [];
    const fieldMap = apiToEntityMap[this.cls.name];

    let containsCreatedAt = false;
    if (value !== undefined) {
      const kvs = value.split(',');
      for (const kv of kvs) {
        const [field, order] = kv.split(':');
        const entityField = fieldMap[field] ?? field;
        if (entityField === 'createdAt') {
          containsCreatedAt = true;
        }
        orderBy.push({
          [entityField]: order,
        } as any);
      }
    }

    if (!containsCreatedAt) {
      orderBy.push({ createdAt: SortOrder.ASC } as any);
    }
    return orderBy;
  }
}
