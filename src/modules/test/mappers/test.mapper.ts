import { Injectable } from '@nestjs/common';
import { TestTeacherResponse } from '../../../common/responses/test-teacher.response';
import { DbLessonTest } from '../../../database/entities/lesson-test.entity';
import { TestQuestionMapper } from './test-question.mapper';

@Injectable()
export class TestMapper {
  constructor (private questionMapper: TestQuestionMapper) {}

  toTestTeacherResponse ({
    questionCount,
    questions,
  }: DbLessonTest): TestTeacherResponse {
    return {
      questionCount,
      questions: questions.map((q) =>
        this.questionMapper.toTestQuestionTeacherResponse(q),
      ),
    };
  }
}
