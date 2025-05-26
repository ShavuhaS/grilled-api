import { DbFilter } from '../types/db-filter.type';
import { EntityMap } from '../interfaces/entity-map.interface';
import { apiToEntityMap } from '../../common/utils/entity-field-map.constant';
import { FilterMethod, filterMethods } from '../types/filter-method.type';

export class FilterUtil {
  static getFilter<T extends keyof EntityMap>(
    entityName: T,
    obj: object,
  ): Partial<Record<string, DbFilter>> {
    const newObj = {};
    const fieldMap = apiToEntityMap[entityName];
    for (const field in obj) {
      const newField = field in fieldMap ? fieldMap[field] : field;
      const value = obj[field];
      if (typeof value === 'object') {
        const newValue = {};
        const keys = Object.keys(value).filter((k) =>
          filterMethods.includes(k as FilterMethod),
        ) as FilterMethod[];
        for (const key of keys) {
          newValue[key] = value[key];
        }
        newObj[newField] = newValue;
      } else {
        newObj[newField] = value;
      }
    }
    return newObj;
  }
}
