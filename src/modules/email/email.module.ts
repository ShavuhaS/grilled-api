import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import * as mailgunTransporter from 'nodemailer-mailgun-transport';
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
      useFactory: (config: EmailConfigService) => ({
        transport: !!config.mailgunApiKey
          ? mailgunTransporter({
            auth: {
              apiKey: config.mailgunApiKey,
              domain: config.mailgunDomain,
            },
          })
          : {
            host: config.smtpHost,
            port: config.smtpPort,
            secure: config.smtpSecure,
            auth: {
              user: config.smtpUsername,
              pass: config.smtpPassword,
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
