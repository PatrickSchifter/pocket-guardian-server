import { EmailService } from './EmailService';
import { config } from '../config/config';
import { getConfirmationEmail } from '../utils/htmlConfirmationEmail';

export class ConfirmationEmailSender {
  private readonly emailService: EmailService;

  constructor() {
    this.emailService = new EmailService({
      auth: { pass: config.email.pass, user: config.email.sender },
      service: config.email.service,
    });
  }

  async sendEmail(email: string, id: string): Promise<void> {
    const emailData = {
      to: [email],
      subject: 'Confirmation Email Pocket Guardian',
      html: getConfirmationEmail(config.email.link_confirmation + id || '')
    };

    try {
      this.emailService.send(email, emailData.subject, emailData.html);
    } catch (error) {
      console.error('An error occurred while sending the email:', error);
    }
  }
}
