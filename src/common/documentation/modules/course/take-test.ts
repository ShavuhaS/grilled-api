import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { TestScoreResponse } from '../../../responses/test-score.response';
import { TakeTestDto } from '../../../dtos/take-test.dto';

export const TakeTestDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only an enrolled user can take a test'],
  body: {
    type: TakeTestDto,
  },
  ok: {
    type: TestScoreResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Answers must not be empty
      Answers array must be an array
      Answers array must not be empty
      Answer id must not be empty
      Answer id must be a valid UUID
      Answer ids must not be empty
      Answer ids must be an array
      Answer ids array must not be empty
      Answer ids must be valid UUIDs
      Answer must not be empty
      Answer must be a string
      
    QuestionAnswerDisconnectionException:
      Test question with such id has no answer with such id
      Test with such id has no question with such id
      
    InvalidEntityTypeException:
      Question type is invalid`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
