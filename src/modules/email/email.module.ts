import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'node:path';
import { EmailService } from './email.service';
import { ConfigurationModule } from '../../config/configuration.module';
import { EmailConfigService } from '../../config/email-config.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [EmailConfigService],
      useFactory: (emailConfig: EmailConfigService) => ({
        transport: {
          host: emailConfig.host,
          port: emailConfig.port,
          secure: false,
          auth: {
            user: emailConfig.username,
            pass: emailConfig.password,
          },
        },
        defaults: {
          from: '"GrillEd" <noreply@grilled.com>',
        },
        template: {
          dir: resolve('email', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
})
export class EmailModule {}
