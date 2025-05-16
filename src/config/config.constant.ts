import { GIGABYTE } from '../common/utils/file.constants';
import { seconds } from '../common/utils/time.constants';

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  baseUrl: process.env.BASE_URL,
  frontBaseUrl: process.env.FRONT_BASE_URL,
  security: {
    secret: {
      access: process.env.JWT_ACCESS_SECRET ?? '42',
      refresh: process.env.JWT_REFRESH_SECRET ?? '42',
    },
    jwt: {
      ttl: process.env.JWT_TTL ?? seconds.DAY,
      refreshTtl: process.env.JWT_REFRESH_TTL ?? seconds.WEEK,
    },
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE ?? false,
      username: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD,
    },
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  },
  storage: {
    credential: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    bucket: process.env.STORAGE_BUCKET_NAME,
    signatureTtl: process.env.STORAGE_SIGNATURE_TTL ?? seconds.DAY,
  },
  static: {
    servePath: '/static',
    dir: process.env.STATIC_DIR,
  },
  multer: {
    dir: process.env.TEMP_DIR,
    maxFileSize: process.env.MAX_UPLOAD_SIZE ?? GIGABYTE,
  },
  ffmpeg: {
    path: {
      ffmpeg: process.env.FFMPEG_PATH || undefined,
      ffprobe: process.env.FFPROBE_PATH || undefined,
    },
  },
});
