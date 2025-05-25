import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../default-responses.constants';
import { ArticleLessonTeacherResponse } from '../../../responses/article-lesson-teacher.response';
import { UpdateArticleDto } from '../../../dtos/update-article.dto';

export const UpdateArticleDocumentation: ApiDocumentationParams = {
  authRequired: true,
  policies: ['Only the owner of the course can update the article'],
  params: [
    {
      name: 'courseId',
      type: String,
      required: true,
    },
    {
      name: 'lessonId',
      type: String,
      required: true,
    },
  ],
  body: {
    type: UpdateArticleDto,
  },
  badRequest: {
    description: `
    InvalidEntityIdException:
      Course with such id was not found
      Lesson with such id was not found
      
    CourseLessonDisconnectionException:
      Course with such id has no lesson with such id
      
    InvalidBodyException:
      Article must not be empty
      Article must be a string
      Article must be at least 50 characters long
      Article must be at most 5000 characters long`,
  },
  ok: {
    type: ArticleLessonTeacherResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
