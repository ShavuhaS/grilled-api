export class DurationUpdatedEvent {
  constructor (
    public lessonId: string,
    public moduleId: string,
    public courseId: string,
    public durationDelta: number,
  ) {}
}