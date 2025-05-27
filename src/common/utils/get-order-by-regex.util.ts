import { SortableConstructor } from '../../database/interfaces/sortable.interface';
import { SortOrder } from '../enums/sort-order.enum';
import { entityToApiMap } from './entity-field-map.constant';

export function getSortFormat(cls: SortableConstructor<any>): string {
  const fieldMap = entityToApiMap[cls.name];
  const entityFields = new cls().sortFields;
  const apiFields = entityFields.map((f) => fieldMap[f]);
  const fieldUnion = apiFields.join('|');
  const orderUnion = Object.values(SortOrder).join('|');
  return `(${fieldUnion}):(${orderUnion})`;
}

export function getSortRegex(cls: SortableConstructor<any>): RegExp {
  const kv = getSortFormat(cls);
  const regex = `^${kv}(,${kv})*$`;
  return new RegExp(regex);
}

export function getSortFormatByKeys(keys: string[]): string {
  const fieldUnion = keys.join('|');
  const orderUnion = Object.values(SortOrder).join('|');
  return `(${fieldUnion}):(${orderUnion})`;
}

export function getSortRegexByKeys(keys: string[]): RegExp {
  const kv = getSortFormatByKeys(keys);
  const regex = `^${kv}(,${kv})*$`;
  return new RegExp(regex);
}
