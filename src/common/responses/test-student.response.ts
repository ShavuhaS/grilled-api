import { BaseTestResponse } from './base-test.response';
import { ApiProperty } from '@nestjs/swagger';
import { TestQuestionStudentResponse } from './test-question-student.response';

export class TestStudentResponse extends BaseTestResponse {
  @ApiProperty({
    description: 'Test questions',
    type: [TestQuestionStudentResponse],
  })
  questions: TestQuestionStudentResponse[];
}
