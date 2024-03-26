import { EmailService } from './EmailService';
import { config } from '../config/config';
import { getConfirmationEmail } from '../utils/htmlConfirmationEmail';
import { getInviteEmail } from '../utils/htmlInviteEmail';

export class InviteEmailSender {
  private readonly emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendEmail(email: string, group: string, name: string): Promise<void> {
    const emailData = {
      to: [email],
      subject: `${name} te convidou para o grupo ${group} no Pocket Guardian`,
      html: getInviteEmail({link: config.link.web + 'login', group , name})
    };

    try {
      const response = await this.emailService.send(email, emailData.subject, emailData.html);
    } catch (error) {
      console.error('An error occurred while sending the email:', error);
    }
  }
}
