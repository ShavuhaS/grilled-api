export function nonEmptyObject<T extends object>(obj: T): T | undefined {
  return Object.keys(obj).length === 0 ? undefined : obj;
}

export function formattedJson(
  obj: object,
  indent: string | number = '\t',
): string {
  return JSON.stringify(obj, null, indent);
}

export function isClass(obj: any): boolean {
  if (typeof obj !== 'function') {
    return false;
  }

  const descriptor = Object.getOwnPropertyDescriptor(obj, 'prototype');

  if (!descriptor) {
    return false;
  }

  return !descriptor.writable;
}

export function reverseObject<K extends string, V extends string>(
  obj: Partial<Record<K, V>>,
): Partial<Record<V, K>> {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
}

export function mapValues<K extends string, V1, V2>(
  obj: Partial<Record<K, V1>>,
  fn: (arg: V1) => V2,
): Partial<Record<K, V2>> {
  const result = {} as Partial<Record<K, V2>>;

  for (const key in obj) {
    result[key] = fn(obj[key]);
  }

  return result;
}
