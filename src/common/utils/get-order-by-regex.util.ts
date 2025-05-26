import { SortableConstructor } from '../../database/interfaces/sortable.interface';
import { SortOrder } from '../enums/sort-order.enum';
import { entityToApiMap } from './entity-field-map.constant';

export function getOrderByFormat(cls: SortableConstructor<any>): string {
  const fieldMap = entityToApiMap[cls.name];
  const entityFields = new cls().sortFields;
  const apiFields = entityFields.map((f) => fieldMap[f]);
  const fieldUnion = apiFields.join('|');
  const orderUnion = Object.values(SortOrder).join('|');
  return `(${fieldUnion}):(${orderUnion})`;
}

export function getOrderByRegex(cls: SortableConstructor<any>): RegExp {
  const kv = getOrderByFormat(cls);
  const regex = `^${kv}(,${kv})*$`;
  return new RegExp(regex);
}
