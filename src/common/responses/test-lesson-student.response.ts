import { LessonResponse } from './lesson.response';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TestScoreResponse } from './test-score.response';

export class TestLessonStudentResponse extends LessonResponse {
  @ApiPropertyOptional({
    description: "User's test results (if the lesson is a test)",
  })
  testResults?: TestScoreResponse;
}
