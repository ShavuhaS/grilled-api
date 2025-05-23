export function nonEmptyObject<T extends object> (obj: T): T | undefined {
  return Object.keys(obj).length === 0 ? undefined : obj;
}

export function formattedJson (
  obj: object,
  indent: string | number = '\t',
): string {
  return JSON.stringify(obj, null, indent);
}

export function isClass (obj: any): boolean {
  if (typeof obj !== 'function') {
    return false;
  }

  const descriptor = Object.getOwnPropertyDescriptor(obj, 'prototype');

  if (!descriptor) {
    return false;
  }

  return !descriptor.writable;
}
