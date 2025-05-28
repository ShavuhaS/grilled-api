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
import { EmptyCourseContentException } from '../../common/exceptions/empty-course-content.exception';
import { InvalidTestAnswersException } from '../../common/exceptions/invalid-test-answers.exception';
import { AnswerDto, TakeTestDto } from '../../common/dtos/take-test.dto';
import { TestScoreResponse } from '../../common/responses/test-score.response';
import { TestAttemptRepository } from '../../database/repositories/test-attempt.repository';
import { ChoiceAnswerDto } from '../../common/dtos/choice-answer.dto';
import { MultichoiceAnswerDto } from '../../common/dtos/multichoice-answer.dto';
import { ShortAnswerDto } from '../../common/dtos/short-answer.dto';
import { ValidateAnswerFunction } from '../course/types/validate-answer.type';
import { QuestionAnswerDisconnectionException } from '../../common/exceptions/question-answer-disconnection.exception';
import { QuestionTestDisconnectionException } from '../../common/exceptions/question-test-disconnection.exception';
import { InvalidEntityTypeException } from '../../common/exceptions/invalid-entity-type.exception';
import { RecordAnswerFunction } from '../course/types/record-answer.type';
import { AttemptAnswerRepository } from '../../database/repositories/attempt-answer.repository';
import { EvaluateAnswerFunction } from '../course/types/evaluate-answer.type';

export const singleAnswerQuestionTypes: QuestionTypeEnum[] = [
  QuestionTypeEnum.CHOICE,
  QuestionTypeEnum.FILL_IN,
  QuestionTypeEnum.NUMERIC,
];

export const choiceQuestionTypes: QuestionTypeEnum[] = [
  QuestionTypeEnum.CHOICE,
  QuestionTypeEnum.MULTICHOICE,
];

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

  private readonly validateAnswerMap: Partial<
    Record<QuestionTypeEnum, ValidateAnswerFunction>
  > = {
    [QuestionTypeEnum.CHOICE]: this.validateChoiceAnswer.bind(this),
    [QuestionTypeEnum.MULTICHOICE]: this.validateMultichoiceAnswer.bind(this),
    [QuestionTypeEnum.SHORT_ANSWER]: this.validateShortAnswer.bind(this),
  };

  private readonly recordAnswerMap: Partial<
    Record<QuestionTypeEnum, RecordAnswerFunction>
  > = {
    [QuestionTypeEnum.CHOICE]: this.recordChoiceAnswer.bind(this),
    [QuestionTypeEnum.MULTICHOICE]: this.recordMultichoiceAnswer.bind(this),
    [QuestionTypeEnum.SHORT_ANSWER]: this.recordShortAnswer.bind(this),
  };

  private readonly evaluateAnswerMap: Partial<
    Record<QuestionTypeEnum, EvaluateAnswerFunction>
  > = {
    [QuestionTypeEnum.CHOICE]: this.evaluateChoiceAnswer.bind(this),
    [QuestionTypeEnum.MULTICHOICE]: this.evaluateMultichoiceAnswer.bind(this),
    [QuestionTypeEnum.SHORT_ANSWER]: this.evaluateShortAnswer.bind(this),
  };

  constructor(
    private testRepository: CourseTestRepository,
    private questionRepository: TestQuestionRepository,
    private attemptRepository: TestAttemptRepository,
    private attemptAnswerRepository: AttemptAnswerRepository,
  ) {}

  async getById(id: string): Promise<DbLessonTest> {
    return this.testRepository.findById(id, {
      questions: {
        include: {
          answers: true,
        },
      },
    });
  }

  async getUserResults(id: string, userId: string): Promise<TestResults> {
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

    const userAttempt = userTest?.userAttempts?.find(
      (a) => a.userId === userId,
    );

    return {
      score: userAttempt?.result?.toNumber() ?? null,
      maxScore: test.questionCount,
    };
  }

  async createEmpty(lessonId: string): Promise<DbLessonTest> {
    return this.testRepository.create({
      lesson: { connect: { id: lessonId } },
      questionCount: 0,
    });
  }

  async create(
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

    const updatedTest = await this.testRepository.updateById(test.id, {
      questionCount: dbQuestions.length,
    });

    updatedTest.questions = dbQuestions;
    dbLesson.test = updatedTest;

    return dbLesson;
  }

  async deleteById(id: string) {
    await this.testRepository.deleteById(id);
  }

  async validateDraftTest(lessonId: string) {
    const test = await this.testRepository.find(
      { lessonId },
      { questions: { include: { answers: true } } },
    );
    if (!test || test.questions.length === 0) {
      throw new EmptyCourseContentException('Test');
    }

    for (const question of test.questions) {
      this.validateQuestion(question);
    }
  }

  validateQuestion(question: DbTestQuestion) {
    const emptyErr = new EmptyCourseContentException(
      'Test question answer list',
    );
    const answerErr = new InvalidTestAnswersException();
    if (question.answers.length === 0) {
      throw emptyErr;
    }

    const correctAnswers = question.answers.filter((ans) => ans.correct);

    if (
      singleAnswerQuestionTypes.includes(question.type) &&
      correctAnswers.length !== 1
    ) {
      throw answerErr;
    }
  }

  validateNewTest({ questions }: TestLessonDto) {
    for (const question of questions) {
      const isValid = this.questionValidMap[question.type];
      if (isValid !== undefined && !isValid(question)) {
        throw new InvalidEntityIndexException('Question answer');
      }
    }
  }

  private isChoiceQuestionValid({
    answers,
    rightAnswer,
  }: ChoiceTestQuestionDto): boolean {
    return 0 <= rightAnswer && rightAnswer < answers.length;
  }

  private isMultiChoiceQuestionValid({
    answers,
    rightAnswers,
  }: MultiChoiceTestQuestionDto): boolean {
    return rightAnswers.every((ans) => 0 <= ans && ans < answers.length);
  }

  private async createBaseQuestion(
    testId: string,
    { text, type }: TestQuestionDto,
  ): Promise<DbTestQuestion> {
    return this.questionRepository.create({
      test: { connect: { id: testId } },
      type,
      text,
    });
  }

  private async createChoiceQuestion(
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

  private async createMultiChoiceQuestion(
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

  private async createShortAnswerQuestion(
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

  async takeTest(
    userId: string,
    testId: string,
    dto: TakeTestDto,
  ): Promise<TestScoreResponse> {
    await this.validateAnswers(testId, dto);

    const testAttempt = await this.getNewAttempt(userId, testId);
    await this.recordAttemptAnswers(testAttempt.id, dto);

    const results = await this.evaluateAttempt(testId, dto);
    await this.attemptRepository.updateById(testAttempt.id, {
      result: results.score,
    });

    return results;
  }

  private async validateAnswers(testId: string, dto: TakeTestDto) {
    for (const answer of dto.answers) {
      await this.validateAnswerMap[answer.type](testId, answer);
    }
  }

  private async validateChoiceAnswer(testId: string, answer: ChoiceAnswerDto) {
    const { answerId, questionId } = answer;
    const question = await this.questionRepository.findOne(
      { id: questionId, answers: { some: { id: answerId } } },
      { test: true },
    );
    if (!question) {
      throw new QuestionAnswerDisconnectionException();
    }
    if (question.type !== QuestionTypeEnum.CHOICE) {
      throw new InvalidEntityTypeException('Question');
    }
    if (question.test.id !== testId) {
      throw new QuestionTestDisconnectionException();
    }
  }

  private async validateMultichoiceAnswer(
    testId: string,
    answer: MultichoiceAnswerDto,
  ) {
    const { answerIds, questionId } = answer;
    const question = await this.questionRepository.findOne(
      { id: questionId, answers: { some: { id: { in: answerIds } } } },
      { answers: true, test: true },
    );
    if (!question) {
      throw new QuestionAnswerDisconnectionException();
    }
    if (question.type !== QuestionTypeEnum.MULTICHOICE) {
      throw new InvalidEntityTypeException('Question');
    }
    const rightAnswerIds = answerIds.filter(
      (id) => !!question.answers.find((ans) => ans.id === id),
    );
    if (rightAnswerIds.length !== answerIds.length) {
      throw new QuestionAnswerDisconnectionException();
    }
    if (question.test.id !== testId) {
      throw new QuestionTestDisconnectionException();
    }
  }

  private async validateShortAnswer(testId: string, answer: ShortAnswerDto) {
    const { questionId } = answer;
    const question = await this.questionRepository.findById(questionId, {
      test: true,
    });
    if (!question) {
      throw new InvalidEntityIdException('Question');
    }
    if (question.type !== QuestionTypeEnum.SHORT_ANSWER) {
      throw new InvalidEntityTypeException('Question');
    }
    if (question.test.id !== testId) {
      throw new QuestionTestDisconnectionException();
    }
  }

  private async getNewAttempt(userId: string, testId: string) {
    const testAttempt = await this.attemptRepository.find({
      userId_testId: { userId, testId },
    });

    if (!!testAttempt) {
      await this.attemptRepository.deleteById(testAttempt.id);
    }

    return this.attemptRepository.create({
      testId,
      userId,
      result: 0,
    });
  }

  private async recordAttemptAnswers(attemptId: string, dto: TakeTestDto) {
    for (const answer of dto.answers) {
      await this.recordAnswerMap[answer.type](attemptId, answer);
    }
  }

  private async recordChoiceAnswer(attemptId: string, answer: ChoiceAnswerDto) {
    const { answerId, questionId } = answer;
    await this.attemptRepository.updateById(attemptId, {
      answers: {
        create: {
          testQuestionId: questionId,
          choices: {
            create: {
              testAnswerId: answerId,
            },
          },
        },
      },
    });
  }

  private async recordMultichoiceAnswer(
    attemptId: string,
    answer: MultichoiceAnswerDto,
  ) {
    const { questionId, answerIds } = answer;
    const attemptAnswer = await this.attemptAnswerRepository.create({
      attemptId,
      testQuestionId: questionId,
    });
    for (const answerId of answerIds) {
      await this.attemptAnswerRepository.updateById(attemptAnswer.id, {
        choices: {
          create: {
            testAnswerId: answerId,
          },
        },
      });
    }
  }

  private async recordShortAnswer(
    attemptId: string,
    answerDto: ShortAnswerDto,
  ) {
    const { questionId, answer } = answerDto;
    await this.attemptRepository.updateById(attemptId, {
      answers: {
        create: {
          testQuestionId: questionId,
          answer,
        },
      },
    });
  }

  private async evaluateAttempt(
    testId: string,
    dto: TakeTestDto,
  ): Promise<TestScoreResponse> {
    const { questionCount } = await this.testRepository.findById(testId);
    let score = 0;
    for (const answer of dto.answers) {
      score += await this.evaluateAnswerMap[answer.type](answer);
    }
    return { score, maxScore: questionCount };
  }

  private async evaluateChoiceAnswer(answer: ChoiceAnswerDto): Promise<number> {
    const { questionId, answerId } = answer;
    const question = await this.questionRepository.findById(questionId, {
      answers: true,
    });
    const rightAnswer = question.answers.find((ans) => ans.correct);
    return (answerId === rightAnswer.id) ? 1 : 0;
  }

  private async evaluateMultichoiceAnswer(
    answer: MultichoiceAnswerDto,
  ): Promise<number> {
    const { questionId, answerIds } = answer;
    const question = await this.questionRepository.findById(questionId, {
      answers: true,
    });
    const rightAnswerIds = question.answers
      .filter((ans) => ans.correct)
      .map(({ id }) => id);
    if (rightAnswerIds.length !== answerIds.length) {
      return 0;
    }
    const rightAnswerSet = new Set(rightAnswerIds);
    for (const answerId of answerIds) {
      if (!rightAnswerSet.has(answerId)) {
        return 0;
      }
    }
    return 1;
  }

  private async evaluateShortAnswer(answerDto: ShortAnswerDto): Promise<number> {
    const { questionId, answer } = answerDto;
    const question = await this.questionRepository.findById(questionId, {
      answers: true,
    });
    const rightAnswer = question.answers.find((ans) => ans.correct);
    return (answer === rightAnswer.text) ? 1 : 0;
  }
}
