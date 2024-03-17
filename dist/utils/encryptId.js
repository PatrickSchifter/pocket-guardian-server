"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = require("../config/config");
function encrypt(text) {
    let idEncrypted = crypto_js_1.default.AES.encrypt(text, config_1.config.secrets.secretEncryptId || '').toString();
    return idEncrypted.replace(/\//g, '-');
}
exports.encrypt = encrypt;
function decrypt(ciphertext) {
    const decrypt = ciphertext.replace(/\//g, '-');
    const bytes = crypto_js_1.default.AES.decrypt(decrypt, config_1.config.secrets.secretEncryptId || '');
    return bytes.toString(crypto_js_1.default.enc.Utf8);
    ;
}
exports.decrypt = decrypt;
