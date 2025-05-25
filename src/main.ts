import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app.module';
import { validationExceptionFactory } from './common/utils/validation-exception.factory';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { EventEmitter2 } from '@nestjs/event-emitter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: validationExceptionFactory(),
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(app.get(EventEmitter2)));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  const config = new DocumentBuilder()
    .setTitle('GrillEd API')
    .setDescription('Here is GrillEd API documentation')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.info(
    `Server started on http://127.0.0.1:${port}\n` +
      `Swagger available on http://127.0.0.1:${port}/api`,
  );
}
bootstrap();
