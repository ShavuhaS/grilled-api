import { ValidationError } from '@nestjs/common';
import { InvalidBodyException } from '../exceptions/invalid-body.exception';

const flattenValidationErrors = (
  errors: ValidationError[],
  parent = 'obj',
): string[] => {
  const flattenedErrors = [];

  for (const { property, constraints, children } of errors) {
    if (constraints) {
      flattenedErrors.push(
        ...Object.values(constraints).map((c) => `${parent}.${property}: ${c}`),
      );
    }
    if (children.length !== 0) {
      flattenedErrors.push(
        ...flattenValidationErrors(children, `${parent}.${property}`),
      );
    }
  }

  return flattenedErrors;
};

export const validationExceptionFactory = () => (errors: ValidationError[]) => {
  return new InvalidBodyException(flattenValidationErrors(errors));
};
