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

@Injectable()
export class TestQuestionMapper {
  constructor () {}

  toTestQuestionTeacherResponse (
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

  toTestQuestionResponse ({
    id,
    type,
    text,
  }: DbTestQuestion): TestQuestionResponse {
    return { id, type, text };
  }

  toTestQuestionAnswerTeacherResponse ({
    id,
    text,
    commentary,
  }: DbTestQuestionAnswer): TestQuestionAnswerTeacherResponse {
    return {
      id,
      answer: text,
      commentary,
    };
  }

  toChoiceQuestionTeacherResponse (
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

  toMultichoiceQuestionTeacherResponse (
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

  toShortAnswerQuestionTeacherResponse (
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
}
