import { Injectable } from '@nestjs/common';
import { TestTeacherResponse } from '../../../common/responses/test-teacher.response';
import { DbLessonTest } from '../../../database/entities/lesson-test.entity';
import { TestQuestionMapper } from './test-question.mapper';
import { TestStudentResponse } from '../../../common/responses/test-student.response';

@Injectable()
export class TestMapper {
  constructor(private questionMapper: TestQuestionMapper) {}

  toTestTeacherResponse({
    id,
    questionCount,
    questions,
  }: DbLessonTest): TestTeacherResponse {
    return {
      id,
      questionCount,
      questions: questions.map((q) =>
        this.questionMapper.toTestQuestionTeacherResponse(q),
      ),
    };
  }

  toTestStudentResponse({
    id,
    questionCount,
    questions,
  }: DbLessonTest): TestStudentResponse {
    return {
      id,
      questionCount,
      questions: questions.map((q) =>
        this.questionMapper.toTestQuestionStudentResponse(q),
      ),
    };
  }
}
