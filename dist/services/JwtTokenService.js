"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class TokenService {
    static secretKey = config_1.config.secrets.secretJwt || '';
    static generateToken(data) {
        const token = jsonwebtoken_1.default.sign({ data }, this.secretKey, { expiresIn: '24h' });
        return token;
    }
    static verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            return decoded;
        }
        catch (err) {
            throw new Error('Token inválido');
        }
    }
}
exports.TokenService = TokenService;
