import { Injectable } from '@nestjs/common';
import { LessonLinkResponse } from '../../../common/responses/lesson-link.response';
import { DbLessonResource } from '../../../database/entities/lesson-resource.entity';

@Injectable()
export class LessonResourceMapper {
  constructor() {}

  toLinkResponse({ id, name, link }: DbLessonResource): LessonLinkResponse {
    return { id, name, url: link };
  }
}
