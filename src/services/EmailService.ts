import * as nodemailer from 'nodemailer';
import { EmailServiceConfig } from '../schemas/EmailServiceSchema';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private smtpConfig: EmailServiceConfig) {
    this.transporter = nodemailer.createTransport(smtpConfig);
  }

  public send(toAddress: string, subject: string, htmlContent: string): void {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.smtpConfig.auth.user,
      to: toAddress,
      subject: subject,
      html: htmlContent,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error sending email:', error);
      }
    });
  }
}
