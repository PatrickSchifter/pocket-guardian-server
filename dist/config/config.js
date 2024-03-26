"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: process.env.PORT,
    email: {
        from: process.env.EMAIL_FROM,
        sender: process.env.EMAIL_SENDER || '',
        pass: process.env.EMAIL_SENDER_PASS || '',
        service: process.env.EMAIL_SERVICE || '',
        link_confirmation: process.env.URL_APP + 'api/auth/confirm-email/',
        api_key: process.env.APY_KEY_RESEND,
    },
    secrets: {
        secretEncryptId: process.env.SECRET_ID,
        secretJwt: process.env.SECRET_JWT
    },
    link: {
        api: process.env.URL_APP || '' + process.env.PORT || '' + '/',
        web: process.env.URL_FRONT
    }
};
