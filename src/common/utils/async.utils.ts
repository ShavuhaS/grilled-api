export async function everyAsync<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean> | boolean,
): Promise<boolean> {
  const booleans = await Promise.all(array.map(predicate));
  return booleans.every((b) => b);
}

export async function orAsync(promises: Promise<boolean>[]): Promise<boolean> {
  for (const promise of promises) {
    if ((await promise) === true) {
      return true;
    }
  }
  return false;
}
