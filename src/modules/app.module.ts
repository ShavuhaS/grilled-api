import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api.module';
import Configuration from '../config/config.constant';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ApiModule,
    EmailModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [Configuration],
    }),
    ServeStaticModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get<string>('static.dir'),
          serveRoot: configService.get<string>('static.servePath'),
        },
      ],
    }),
  ],
})
export class AppModule {}
