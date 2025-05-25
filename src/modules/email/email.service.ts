import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailVerificationParams } from './types/email-verification-params.type';
import { SendEmailParams } from './types/send-email-params.type';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail({
    to,
    subject,
    template,
    context,
    attachments,
  }: SendEmailParams) {
    await this.mailerService.sendMail({
      to,
      subject,
      attachments,
      template: template && `${template}.hbs`,
      context,
    });
  }

  async sendVerificationEmail({ to, link }: EmailVerificationParams) {
    await this.sendEmail({
      to,
      subject: 'Email verification for GrillEd',
      template: 'email-confirmation',
      context: { link },
    });
  }
}
