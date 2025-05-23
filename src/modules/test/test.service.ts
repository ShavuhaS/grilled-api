import { Injectable } from '@nestjs/common';
import { DbCourseLesson } from '../../database/entities/course-lesson.entity';
import { CreateResourceContext } from '../course/types/create-resource.types';
import { TestLessonDto } from '../../common/dtos/test-lesson.dto';
import { DbTestQuestion } from '../../database/entities/test-question.entity';
import {
  ChoiceTestQuestionDto,
  MultiChoiceTestQuestionDto,
  ShortTestQuestionDto,
  TestQuestionDto,
} from '../../common/dtos/test-question.dto';
import { InvalidEntityIndexException } from '../../common/exceptions/invalid-entity-index.exception';
import { TestQuestionRepository } from '../../database/repositories/test-question.repository';
import { CourseTestRepository } from '../../database/repositories/course-test.repository';
import { QuestionTypeEnum } from '../../common/enums/question-type.enum';
import { ValidateQuestionFunction } from '../course/types/validate-question.type';
import { CreateTestQuestionFunction } from '../course/types/create-question.types';
import { TestResults } from './types/test-results.type';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { DbLessonTest } from '../../database/entities/lesson-test.entity';

@Injectable()
export class TestService {
  private readonly questionValidMap: Partial<
    Record<QuestionTypeEnum, ValidateQuestionFunction>
  > = {
    [QuestionTypeEnum.CHOICE]: this.isChoiceQuestionValid.bind(this),
    [QuestionTypeEnum.MULTICHOICE]: this.isMultiChoiceQuestionValid.bind(this),
  } as const;

  private readonly createTestQuestionMap: Partial<
    Record<QuestionTypeEnum, CreateTestQuestionFunction>
  > = {
    [QuestionTypeEnum.CHOICE]: this.createChoiceQuestion.bind(this),
    [QuestionTypeEnum.MULTICHOICE]: this.createMultiChoiceQuestion.bind(this),
    [QuestionTypeEnum.SHORT_ANSWER]: this.createShortAnswerQuestion.bind(this),
  } as const;

  constructor (
    private testRepository: CourseTestRepository,
    private questionRepository: TestQuestionRepository,
  ) {}

  async getUserResults (id: string, userId: string): Promise<TestResults> {
    const test = await this.testRepository.findById(id);

    if (!test) {
      throw new InvalidEntityIdException('Test');
    }

    const userTest = await this.testRepository.findOne(
      {
        id,
        userAttempts: { some: { userId } },
      },
      { userAttempts: true },
    );

    const userAttempt = userTest?.userAttempts?.find((a) => a.userId === userId);

    return {
      score: userAttempt?.result?.toNumber() ?? null,
      maxScore: test.questionCount,
    };
  }

  async createEmpty (lessonId: string): Promise<DbLessonTest> {
    return this.testRepository.create({
      lesson: { connect: { id: lessonId } },
      questionCount: 0,
    });
  }

  async create (
    dbLesson: DbCourseLesson,
    { lesson }: CreateResourceContext,
  ): Promise<DbCourseLesson> {
    const { questions } = lesson as TestLessonDto;

    const test = await this.createEmpty(dbLesson.id);

    const dbQuestions: DbTestQuestion[] = [];
    for (const question of questions) {
      const createQuestion = this.createTestQuestionMap[question.type];
      if (createQuestion !== undefined) {
        const dbQuestion = await createQuestion(test.id, question);
        dbQuestions.push(dbQuestion);
      }
    }

    const updatedTest = await this.testRepository.updateById(
      test.id,
      { questionCount: dbQuestions.length },
    );

    updatedTest.questions = dbQuestions;
    dbLesson.test = updatedTest;

    return dbLesson;
  }

  validateTest ({ questions }: TestLessonDto) {
    for (const question of questions) {
      const isValid = this.questionValidMap[question.type];
      if (isValid !== undefined && !isValid(question)) {
        throw new InvalidEntityIndexException('Question answer');
      }
    }
  }

  private isChoiceQuestionValid ({
    answers,
    rightAnswer,
  }: ChoiceTestQuestionDto): boolean {
    return 0 <= rightAnswer && rightAnswer < answers.length;
  }

  private isMultiChoiceQuestionValid ({
    answers,
    rightAnswers,
  }: MultiChoiceTestQuestionDto): boolean {
    return rightAnswers.every((ans) => 0 <= ans && ans < answers.length);
  }

  private async createBaseQuestion (
    testId: string,
    { text, type }: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    return this.questionRepository.create({
      test: { connect: { id: testId } },
      type,
      text,
    });
  }

  private async createChoiceQuestion (
    testId: string,
    question: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    const { answers, rightAnswer } = question as ChoiceTestQuestionDto;

    const dbQuestion = await this.createBaseQuestion(testId, question);

    return this.questionRepository.update(
      { id: dbQuestion.id },
      {
        answers: {
          createMany: {
            data: answers.map(({ text, commentary }, ind) => ({
              text,
              commentary,
              correct: ind === rightAnswer,
            })),
          },
        },
      },
      { answers: true },
    );
  }

  private async createMultiChoiceQuestion (
    testId: string,
    question: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    const { answers, rightAnswers } = question as MultiChoiceTestQuestionDto;

    const dbQuestion = await this.createBaseQuestion(testId, question);

    return this.questionRepository.update(
      { id: dbQuestion.id },
      {
        answers: {
          createMany: {
            data: answers.map(({ text, commentary }, ind) => ({
              text,
              commentary,
              correct: rightAnswers.includes(ind),
            })),
          },
        },
      },
      { answers: true },
    );
  }

  private async createShortAnswerQuestion (
    testId: string,
    question: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    const { rightAnswer } = question as ShortTestQuestionDto;

    const dbQuestion = await this.createBaseQuestion(testId, question);

    return this.questionRepository.update(
      { id: dbQuestion.id },
      {
        answers: {
          create: {
            text: rightAnswer.text,
            commentary: rightAnswer.commentary,
            correct: true,
          },
        },
      },
      { answers: true },
    );
  }
}
