"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteEmailSender = void 0;
const EmailService_1 = require("./EmailService");
const config_1 = require("../config/config");
const htmlInviteEmail_1 = require("../utils/htmlInviteEmail");
class InviteEmailSender {
    emailService;
    constructor() {
        this.emailService = new EmailService_1.EmailService();
    }
    async sendEmail(email, group, name) {
        const emailData = {
            to: [email],
            subject: `${name} te convidou para o grupo ${group} no Pocket Guardian`,
            html: (0, htmlInviteEmail_1.getInviteEmail)({ link: config_1.config.link.web + 'login', group, name })
        };
        try {
            const response = await this.emailService.send(email, emailData.subject, emailData.html);
        }
        catch (error) {
            console.error('An error occurred while sending the email:', error);
        }
    }
}
exports.InviteEmailSender = InviteEmailSender;
