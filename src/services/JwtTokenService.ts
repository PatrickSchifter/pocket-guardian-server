import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class TokenService {
  private static readonly secretKey: string = config.secrets.secretJwt || '';

  static generateToken(data: { email: string; iduser: number }): string {
    const token = jwt.sign({ data }, this.secretKey, { expiresIn: '24h' });
    return token;
  }

  static verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
}
