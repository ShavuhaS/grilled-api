import { SortOrder } from '../enums/sort-order.enum';
import { Sortable } from '../../database/interfaces/sortable.interface';

export type OrderByDto<T extends Sortable> = {
  [key in T['sortFields'][number]]: SortOrder;
}[];