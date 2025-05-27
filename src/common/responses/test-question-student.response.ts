import { TestQuestionResponse } from './test-question.response';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TestQuestionAnswerStudentResponse } from './test-question-answer-student.response';

export class TestQuestionStudentResponse extends TestQuestionResponse {
  @ApiPropertyOptional({
    description: 'Question answers',
    type: [TestQuestionAnswerStudentResponse],
  })
  answers?: TestQuestionAnswerStudentResponse[];
}
