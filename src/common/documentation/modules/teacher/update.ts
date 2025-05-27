import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { UpdateTeacherDto } from '../../../dtos/update-teacher.dto';
import { BaseTeacherResponse } from '../../../responses/base-teacher.response';

export const UpdateMeDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only a teacher can update his profile'],
  body: {
    type: UpdateTeacherDto,
  },
  ok: {
    type: BaseTeacherResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};