import { CourseProgress, ModuleProgress } from './course-progress.interface';

export interface LessonMappingOptions {
  links: boolean;
  completed?: boolean;
}

export interface ModuleMappingOptions extends Partial<ModuleProgress> {
  links: boolean;
}

export interface CourseMappingOptions {
  links: boolean;
  progress?: CourseProgress;
}