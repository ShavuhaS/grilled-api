import { EntityMap } from '../../database/interfaces/entity-map.interface';
import { EntityFieldMapping } from '../../database/types/entity-field-mapping.type';
import { mapValues, reverseObject } from './object.utils';

type ApiFieldMapping = Partial<{
  [Entity in keyof EntityMap]: EntityFieldMapping<EntityMap[Entity]>;
}>;

export const entityToApiMap: ApiFieldMapping = {
  DbCourse: {
    name: 'name',
    createdAt: 'createdAt',
    estimatedTime: 'duration',
    level: 'level',
    status: 'status',
    avgRating: 'rating',
    enrolledCount: 'enrolledCount',
  },
  DbSkill: {
    name: 'name',
    createdAt: 'createdAt',
  },
};

export const apiToEntityMap = mapValues(entityToApiMap, (mapping) =>
  reverseObject(mapping),
);
