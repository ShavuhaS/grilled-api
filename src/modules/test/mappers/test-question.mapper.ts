import { Injectable } from '@nestjs/common';
import { DbTestQuestion } from '../../../database/entities/test-question.entity';
import { TestQuestionTeacherResponse } from '../../../common/responses/test-teacher.response';
import { QuestionTypeEnum } from '../../../common/enums/question-type.enum';
import { TestQuestionResponse } from '../../../common/responses/test-question.response';
import { DbTestQuestionAnswer } from '../../../database/entities/test-question-answer.entity';
import { TestQuestionAnswerTeacherResponse } from '../../../common/responses/test-question-answer-teacher.response';
import { ChoiceQuestionTeacherResponse } from '../../../common/responses/choice-question-teacher.response';
import { MultichoiceQuestionTeacherResponse } from '../../../common/responses/multichoice-question-teacher.response';
import { ShortAnswerQuestionTeacherResponse } from '../../../common/responses/short-answer-question-teacher.response';
import { TestQuestionStudentResponse } from '../../../common/responses/test-question-student.response';
import {
  choiceQuestionTypes,
  singleAnswerQuestionTypes,
} from '../test.service';
import { TestQuestionAnswerStudentResponse } from '../../../common/responses/test-question-answer-student.response';

@Injectable()
export class TestQuestionMapper {
  constructor() {}

  toTestQuestionTeacherResponse(
    question: DbTestQuestion,
  ): TestQuestionTeacherResponse {
    switch (question.type) {
      case QuestionTypeEnum.CHOICE:
        return this.toChoiceQuestionTeacherResponse(question);
      case QuestionTypeEnum.MULTICHOICE:
        return this.toMultichoiceQuestionTeacherResponse(question);
      case QuestionTypeEnum.SHORT_ANSWER:
        return this.toShortAnswerQuestionTeacherResponse(question);
      default:
        return null;
    }
  }

  toTestQuestionResponse({
    id,
    type,
    text,
  }: DbTestQuestion): TestQuestionResponse {
    return { id, type, text };
  }

  toTestQuestionAnswerStudentResponse({
    id,
    text,
  }: DbTestQuestionAnswer): TestQuestionAnswerStudentResponse {
    return { id, answer: text };
  }

  toTestQuestionAnswerTeacherResponse(
    a: DbTestQuestionAnswer,
  ): TestQuestionAnswerTeacherResponse {
    return {
      ...this.toTestQuestionAnswerStudentResponse(a),
      commentary: a.commentary,
    };
  }

  toChoiceQuestionTeacherResponse(
    question: DbTestQuestion,
  ): ChoiceQuestionTeacherResponse {
    const answers = question.answers;
    const rightAnswer = answers.find((ans) => ans.correct);

    return {
      ...this.toTestQuestionResponse(question),
      answers: answers.map((ans) =>
        this.toTestQuestionAnswerTeacherResponse(ans),
      ),
      rightAnswer: rightAnswer.id,
    };
  }

  toMultichoiceQuestionTeacherResponse(
    question: DbTestQuestion,
  ): MultichoiceQuestionTeacherResponse {
    const answers = question.answers;
    const rightAnswers = answers.filter((ans) => ans.correct);

    return {
      ...this.toTestQuestionResponse(question),
      answers: answers.map((ans) =>
        this.toTestQuestionAnswerTeacherResponse(ans),
      ),
      rightAnswers: rightAnswers.map(({ id }) => id),
    };
  }

  toShortAnswerQuestionTeacherResponse(
    question: DbTestQuestion,
  ): ShortAnswerQuestionTeacherResponse {
    const answers = question.answers;
    const rightAnswer = answers.find((ans) => ans.correct);

    return {
      ...this.toTestQuestionResponse(question),
      answer: rightAnswer.text,
      answerId: rightAnswer.id,
    };
  }

  toTestQuestionStudentResponse(
    q: DbTestQuestion,
  ): TestQuestionStudentResponse {
    const answers = choiceQuestionTypes.includes(q.type)
      ? q.answers
      : undefined;

    return {
      ...this.toTestQuestionResponse(q),
      answers: answers?.map((ans) =>
        this.toTestQuestionAnswerStudentResponse(ans),
      ),
    };
  }
}
