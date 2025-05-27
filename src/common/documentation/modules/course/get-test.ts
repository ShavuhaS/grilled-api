import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { TestStudentResponse } from '../../../responses/test-student.response';
import { getSchemaPath } from '@nestjs/swagger';
import { TestTeacherResponse } from '../../../responses/test-teacher.response';

export const GetTestDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: [
    'Only the course owner and enrolled students can access the tests',
  ],
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
    {
      name: 'testId',
      type: String,
      required: true,
    },
  ],
  ok: {
    schema: {
      oneOf: [
        { $ref: getSchemaPath(TestStudentResponse) },
        { $ref: getSchemaPath(TestTeacherResponse) },
      ],
    },
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
