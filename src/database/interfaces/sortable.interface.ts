export interface Sortable {
  get sortFields(): readonly string[];
}

export interface SortableConstructor {
  new (...args: any[]): Sortable
}