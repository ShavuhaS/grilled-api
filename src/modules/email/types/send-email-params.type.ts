export type EmailAttachment = {
  filename: string;
  contentType: string;
  content: Buffer;
};

export type SendEmailParams = {
  to: string;
  subject: string;
  template?: string;
  context?: Record<string, any>;
  attachments?: EmailAttachment[];
};
