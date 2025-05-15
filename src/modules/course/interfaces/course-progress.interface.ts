export interface CourseProgress {
  course: number;
  modules: ModuleProgress[];
}

export interface ModuleProgress {
  completed: boolean[];
  progress: number;
}
