export class ModuleDurationChangedEvent {
  constructor(
    public moduleId: string,
    public courseId: string,
    public durationDelta: number,
  ) {}
}
