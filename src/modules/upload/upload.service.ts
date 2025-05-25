import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as fs from 'node:fs/promises';
import { FILE_PROCESSED_EVENT } from './events/file-processed.event';
import { FileProcessedEvent } from '../../common/events/file-processed.event';

@Injectable()
export class UploadService {
  constructor() {}

  @OnEvent(FILE_PROCESSED_EVENT)
  async deleteUnprocessedFile({ filePath }: FileProcessedEvent) {
    if (filePath) {
      await fs.unlink(filePath);
    }
  }
}
