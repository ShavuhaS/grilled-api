import { Prisma } from '@prisma/client';

export class DecimalNumber extends Prisma.Decimal {
  constructor (value = 0) {
    super(value);
  }
}
