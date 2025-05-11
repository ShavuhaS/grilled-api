import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { Bucket } from '@google-cloud/storage';
import { StorageConfigService } from '../../config/services/storage-config.service';

@Injectable()
export class StorageService {
  private readonly bucket: Bucket;

  constructor (
    private storageConfig: StorageConfigService,
  ) {
    const app = initializeApp({
      credential: cert(storageConfig.credential),
      storageBucket: storageConfig.bucket,
    });
    this.bucket = getStorage(app).bucket();
  }

  async uploadVideo (courseId: string, moduleId: string, lessonId: string, video: Express.Multer.File) {

  }
}
