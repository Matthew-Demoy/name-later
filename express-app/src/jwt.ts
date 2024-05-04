import * as crypto from 'crypto';

export interface JwtPayload {
  data: {
    username : string
  };
  exp: number; // Expiration time in seconds since Unix epoch
}

const SECRET_KEY = 'A_SECURE_SERCRET_KEY';

export const generateJwt = (payload: JwtPayload): string => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');

  const signature = crypto.createHmac('sha256', SECRET_KEY)
    .update(header + '.' + encodedPayload)
    .digest('base64');

  return `${header}.${encodedPayload}.${signature}`;
};

export const parseJwt = (token: string): JwtPayload | null => {
  const [header, encodedPayload, signature] = token.split('.');
  
  // Verify signature
  const expectedSignature = crypto.createHmac('sha256', SECRET_KEY)
    .update(header + '.' + encodedPayload)
    .digest('base64');

  if (signature !== expectedSignature) {
    return null; // Invalid token
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
  return payload;
};