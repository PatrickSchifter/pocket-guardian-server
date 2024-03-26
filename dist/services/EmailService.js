"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const resend_1 = require("resend");
const config_1 = require("../config/config");
class EmailService {
    resend;
    constructor() {
        this.resend = new resend_1.Resend(config_1.config.email.api_key);
    }
    async send(toAddress, subject, htmlContent) {
        const response = await this.resend.emails.send({
            from: config_1.config.email.sender,
            to: toAddress,
            subject: subject,
            html: htmlContent,
        });
        return response;
    }
}
exports.EmailService = EmailService;
