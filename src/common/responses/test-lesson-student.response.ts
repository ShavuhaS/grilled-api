import { LessonResponse } from './lesson.response';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestScoreResponse } from './test-score.response';

export class TestResultsStudentResponse {
  @ApiProperty({
    description: 'Test id',
  })
  id: string;

  @ApiPropertyOptional({
    description: "User's test results (if the lesson is a test)",
    type: TestScoreResponse,
  })
  results: TestScoreResponse;
}

export class TestLessonStudentResponse extends LessonResponse {
  @ApiPropertyOptional({
    description: 'Lesson test (if it exists)',
    type: TestResultsStudentResponse,
  })
  test?: TestResultsStudentResponse;
}
