import { ModuleProgress } from './module-progress.interface';

export interface ModuleMappingOptions extends Partial<ModuleProgress> {
  links: boolean;
}
