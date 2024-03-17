"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationEmailSender = void 0;
const EmailService_1 = require("./EmailService");
const config_1 = require("../config/config");
const htmlConfirmationEmail_1 = require("../utils/htmlConfirmationEmail");
class ConfirmationEmailSender {
    emailService;
    constructor() {
        this.emailService = new EmailService_1.EmailService({
            auth: { pass: config_1.config.email.pass, user: config_1.config.email.sender },
            service: config_1.config.email.service,
        });
    }
    async sendEmail(email, id) {
        const emailData = {
            to: [email],
            subject: 'Confirmation Email Pocket Guardian',
            html: (0, htmlConfirmationEmail_1.getConfirmationEmail)(config_1.config.email.link_confirmation + id || '')
        };
        try {
            this.emailService.send(email, emailData.subject, emailData.html);
        }
        catch (error) {
            console.error('An error occurred while sending the email:', error);
        }
    }
}
exports.ConfirmationEmailSender = ConfirmationEmailSender;
