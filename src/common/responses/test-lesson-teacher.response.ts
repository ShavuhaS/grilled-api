import { LessonBaseTeacherResponse } from './lesson-base-teacher.response';
import { ApiProperty } from '@nestjs/swagger';
import { TestTeacherResponse } from './test-teacher.response';

export class TestLessonTeacherResponse extends LessonBaseTeacherResponse {
  @ApiProperty({
    description: 'Test information',
  })
  test: TestTeacherResponse;
}
