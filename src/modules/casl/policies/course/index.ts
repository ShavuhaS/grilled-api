import { Type } from '@nestjs/common';
import { CourseEnrollPolicy } from './enroll';
import { IPolicyHandler } from '../../interfaces/policy-handler.interface';

export const CoursePolicies: Record<string, Type<IPolicyHandler<any>>> = {
  ENROLL: CourseEnrollPolicy,
};