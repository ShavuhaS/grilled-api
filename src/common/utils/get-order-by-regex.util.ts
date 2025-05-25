import { Sortable, SortableConstructor } from '../../database/interfaces/sortable.interface';
import { SortOrder } from '../enums/sort-order.enum';

export function getOrderByKv(cls: SortableConstructor): string {
  const fieldUnion = new cls().sortFields.join('|');
  const orderUnion = Object.values(SortOrder).join('|');
  return `(${fieldUnion}):(${orderUnion})`;
}

export function getOrderByRegex(cls: SortableConstructor): RegExp {
  const kv = getOrderByKv(cls);
  const regex = `^${kv}(,${kv})*$`;
  return new RegExp(regex);
}