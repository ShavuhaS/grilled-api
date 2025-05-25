import { Prisma } from '@prisma/client';

export type TModels<TTypeMap extends Prisma.TypeMap = Prisma.TypeMap> =
  TTypeMap['meta']['modelProps'];

export type TWhere<
  Model extends TModels<TTypeMap>,
  TTypeMap extends Prisma.TypeMap = Prisma.TypeMap,
> = TTypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['where'];

export type TOrder<
  Model extends TModels<TTypeMap>,
  TTypeMap extends Prisma.TypeMap = Prisma.TypeMap,
> = TTypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['orderBy'];

export type TInclude<
  Model extends TModels<TTypeMap>,
  TTypeMap extends Prisma.TypeMap = Prisma.TypeMap,
> = TTypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['include'];

export type TCreate<
  Model extends TModels<TTypeMap>,
  TTypeMap extends Prisma.TypeMap = Prisma.TypeMap,
> = TTypeMap['model'][Capitalize<Model>]['operations']['create']['args']['data'];

export type TUpdate<
  Model extends TModels<TTypeMap>,
  TTypeMap extends Prisma.TypeMap = Prisma.TypeMap,
> = TTypeMap['model'][Capitalize<Model>]['operations']['update']['args']['data'];

export type TWhereUnique<
  Model extends TModels<TTypeMap>,
  TTypeMap extends Prisma.TypeMap = Prisma.TypeMap,
> = TTypeMap['model'][Capitalize<Model>]['operations']['findUnique']['args']['where'];

export type TBatchPayload<
  Model extends TModels<TTypeMap>,
  TTypeMap extends Prisma.TypeMap = Prisma.TypeMap,
> = TTypeMap['model'][Capitalize<Model>]['operations']['updateMany']['result'];
