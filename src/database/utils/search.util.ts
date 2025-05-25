import { TModels, TWhere } from '../types/repository.types';

export class SearchUtil {
  static getFieldSearch<Model extends TModels>(
    search: string,
    ...fields: (keyof TWhere<Model>)[]
  ): TWhere<Model> {
    const words = search.split(/\s+/g).filter((word) => word.length > 0);
    if (words.length === 0) return {};

    return {
      AND: words.map((word) => ({
        OR: fields.map((field) => ({
          [field]: {
            contains: word,
            mode: 'insensitive',
          },
        })),
      })),
    };
  }
}
