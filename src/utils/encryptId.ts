import CryptoJS from 'crypto-js';
import { config } from '../config/config';

export function encrypt(text: string) {
    let idEncrypted = CryptoJS.AES.encrypt(text, config.secrets.secretEncryptId || '').toString();
    return idEncrypted.replace(/\//g, '-');
}

export function decrypt(ciphertext: string) {
    const decrypt = ciphertext.replace(/\//g, '-')
    const bytes  = CryptoJS.AES.decrypt(decrypt, config.secrets.secretEncryptId || '');
    return bytes.toString(CryptoJS.enc.Utf8);;
}