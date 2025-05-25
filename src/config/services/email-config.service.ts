import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfigService {
  constructor(private configService: ConfigService) {}

  get smtpHost(): string {
    return this.configService.get<string>('email.smtp.host');
  }

  get smtpPort(): number {
    return this.configService.get<number>('email.smtp.port');
  }

  get smtpSecure(): boolean {
    return this.configService.get<boolean>('email.smtp.secure');
  }

  get smtpUsername(): string {
    return this.configService.get<string>('email.smtp.username');
  }

  get smtpPassword(): string {
    return this.configService.get<string>('email.smtp.password');
  }

  get mailgunDomain(): string {
    return this.configService.get<string>('email.mailgun.domain');
  }

  get mailgunApiKey(): string {
    return this.configService.get<string>('email.mailgun.apiKey');
  }
}
