import { PipeTransform } from '@nestjs/common';
import { Sortable } from '../../database/interfaces/sortable.interface';
import { OrderByDto } from '../dtos/order-by.dto';
import { SortOrder } from '../enums/sort-order.enum';

export class OrderByPipe<T extends Sortable> implements PipeTransform {
  constructor() {}

  transform(value: string): OrderByDto<T> {
    const orderBy: OrderByDto<T> = [];

    let containsCreatedAt = false;
    if (value !== undefined) {
      const kvs = value.split(',');
      for (const kv of kvs) {
        const [field, order] = kv.split(':');
        if (field === 'createdAt') {
          containsCreatedAt = true;
        }
        orderBy.push({
          [field]: order,
        } as any);
      }
    }

    if (!containsCreatedAt) {
      orderBy.push({ createdAt: SortOrder.ASC } as any);
    }
    return orderBy;
  }
}