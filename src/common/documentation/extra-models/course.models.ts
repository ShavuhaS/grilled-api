import { ArticleLessonTeacherResponse } from '../../responses/article-lesson-teacher.response';
import { VideoLessonTeacherResponse } from '../../responses/video-lesson-teacher.response';
import { TestLessonTeacherResponse } from '../../responses/test-lesson-teacher.response';
import { ArticleLessonStudentResponse } from '../../responses/article-lesson-student.response';
import { VideoLessonStudentResponse } from '../../responses/video-lesson-student.response';
import { TestLessonStudentResponse } from '../../responses/test-lesson-student.response';
import { TestStudentResponse } from '../../responses/test-student.response';
import { ChoiceAnswerDto } from '../../dtos/choice-answer.dto';
import { MultichoiceAnswerDto } from '../../dtos/multichoice-answer.dto';
import { ShortAnswerDto } from '../../dtos/short-answer.dto';

export const CourseExtraModels = [
  ArticleLessonTeacherResponse,
  VideoLessonTeacherResponse,
  TestLessonTeacherResponse,
  ArticleLessonStudentResponse,
  VideoLessonStudentResponse,
  TestLessonStudentResponse,
  TestStudentResponse,
  ChoiceAnswerDto,
  MultichoiceAnswerDto,
  ShortAnswerDto,
];
