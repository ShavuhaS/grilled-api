import { ApiProperty } from '@nestjs/swagger';
import { TestQuestionAnswerStudentResponse } from './test-question-answer-student.response';

export class TestQuestionAnswerTeacherResponse extends TestQuestionAnswerStudentResponse {
  @ApiProperty({
    description: 'Answer commentary (why it is right or wrong)',
  })
  commentary: string;
}
