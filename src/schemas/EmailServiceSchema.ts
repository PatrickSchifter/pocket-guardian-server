export interface EmailServiceConfig {
  service?: string;
  auth: {
    user: string;
    pass: string;
  };
  host?: string;
  port?: number;
  secure?: boolean;
  tls?: {
    ciphers: string;
  }
}
