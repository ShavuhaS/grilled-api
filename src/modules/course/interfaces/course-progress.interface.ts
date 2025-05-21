import { ModuleProgress } from '../../course-module/interfaces/module-progress.interface';

export interface CourseProgress {
  course: number;
  modules: ModuleProgress[];
}
