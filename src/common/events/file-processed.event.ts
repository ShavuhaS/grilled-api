export class FileProcessedEvent {
  filePath?: string;

  constructor (filePath: string) {
    this.filePath = filePath;
  }
}