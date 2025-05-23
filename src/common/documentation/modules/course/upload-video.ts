import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../default-responses.constants';
import { VideoUploadDto } from '../../../dtos/video-upload.dto';
import { VideoLessonTeacherResponse } from '../../../responses/video-lesson-teacher.response';

export const UploadVideoDocumentation: ApiDocumentationParams = {
  authRequired: true,
  acceptsFile: true,
  policies: [
    'Only the course owner can upload the file',
  ],
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
    type: VideoUploadDto,
    description: `
    Allowed extensions: .mp4, .mov, .mkv, .webm, .avi
    Max size: 1GB`,
  },
  ok: {
    type: VideoLessonTeacherResponse,
  },
  badRequest: {
    description: `
    InvalidEntityIdException:
      Course with such id was not found
      Lesson with such id was not found
    
    InvalidEntityTypeException:
      Invalid Lesson type
      
    CourseLessonDisconnectionException:
      Course with such id has no lesson with such id
      
    NoFileException:
      No file provided`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  unsupportedMediaType: {
    description: `
    InvalidFileTypeException:
      Unsupported file extension`,
  },
  payloadTooLarge: {
    description: `
    FileIsTooLargeException:
      File is too large (maximum size: 1GB)`,
  },
};