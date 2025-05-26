import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { Bucket, CreateWriteStreamOptions } from '@google-cloud/storage';
import * as crypto from 'node:crypto';
import * as fs from 'fs';
import { StorageConfigService } from '../../config/services/storage-config.service';
import { getDateString } from '../../common/utils/date.utils';

@Injectable()
export class StorageService {
  private readonly bucket: Bucket;

  constructor(private storageConfig: StorageConfigService) {
    const app = initializeApp({
      credential: cert(storageConfig.credential),
      storageBucket: storageConfig.bucket,
    });
    this.bucket = getStorage(app).bucket();
  }

  private getVideoPath(video: Express.Multer.File): string {
    const date = getDateString();
    const uuid = crypto.randomUUID().slice(0, 8);
    const filename = video.originalname;

    return `videos/${date}-${uuid}-${filename}`;
  }

  async uploadVideo(
    video: Express.Multer.File,
  ): Promise<{ storagePath: string }> {
    const storagePath = this.getVideoPath(video);

    await this.uploadFile(storagePath, video, {
      contentType: video.mimetype,
    });

    return { storagePath };
  }

  private getCourseAvatarPath(avatar: Express.Multer.File): string {
    const uuid = crypto.randomUUID().slice(0, 8);
    return `courseAvatars/${uuid}-${avatar.originalname}`;
  }

  async uploadCourseAvatar(
    avatar: Express.Multer.File,
  ): Promise<{ storagePath: string }> {
    const storagePath = this.getCourseAvatarPath(avatar);

    await this.uploadFile(storagePath, avatar, {
      contentType: avatar.mimetype,
    });

    return { storagePath };
  }

  private getArticlePath(): string {
    const uuid = crypto.randomUUID();
    return `articles/${uuid}.html`;
  }

  async uploadArticle(text: string): Promise<{ storagePath: string }> {
    const buffer = Buffer.from(text);
    const storagePath = this.getArticlePath();

    await this.uploadFile(storagePath, buffer, {
      contentType: 'text/html',
    });

    return { storagePath };
  }

  async getSignedUrl(storagePath: string): Promise<string> {
    return (
      await this.bucket.file(storagePath).getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * this.storageConfig.signatureTtl,
      })
    )[0];
  }

  async deleteFile(storagePath: string) {
    await this.bucket.file(storagePath).delete();
  }

  private async uploadFile(
    storagePath: string,
    file: Express.Multer.File | Buffer,
    options?: CreateWriteStreamOptions,
  ) {
    if (Buffer.isBuffer(file)) {
      return this.uploadFileFromMemory(storagePath, file, options);
    }

    if (file.buffer !== undefined) {
      return this.uploadFileFromMemory(storagePath, file.buffer, options);
    }

    return this.uploadFileFromDisk(storagePath, file, options);
  }

  private async uploadFileFromMemory(
    storagePath: string,
    buffer: Buffer,
    options?: CreateWriteStreamOptions,
  ) {
    return this.bucket.file(storagePath).save(buffer, options);
  }

  private async uploadFileFromDisk(
    storagePath: string,
    file: Express.Multer.File,
    options?: CreateWriteStreamOptions,
  ) {
    const fileStream = fs.createReadStream(file.path);
    const uploadStream = this.bucket
      .file(storagePath)
      .createWriteStream(options);

    return new Promise<void>((resolve, reject) => {
      fileStream.pipe(uploadStream).on('error', reject).on('finish', resolve);
    });
  }
}
