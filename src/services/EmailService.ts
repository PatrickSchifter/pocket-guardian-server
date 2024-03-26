import { EmailServiceConfig } from '../schemas/EmailServiceSchema';
import { Resend } from 'resend';
import { config } from '../config/config';

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(config.email.api_key)
  }

  public async send(toAddress: string, subject: string, htmlContent: string) {
    const response = await this.resend.emails.send({
      from: config.email.sender,
      to: toAddress,
      subject: subject,
      html: htmlContent,
    });
    return response;
  }
}
