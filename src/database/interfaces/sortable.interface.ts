export interface Sortable<T> {
  get sortFields(): readonly (keyof T)[];
}

export interface SortableConstructor<T> {
  new (...args: any[]): Sortable<T>;
}
