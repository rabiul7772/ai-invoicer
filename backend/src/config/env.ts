import { config } from 'dotenv';
config({ path: '.env' });

export const {
  PORT,
  FRONTEND_URL,
  NODE_ENV,
  DB_URI,
  ARCJET_KEY,
  ARCJET_ENV,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  GEMINI_API_KEY,
  GEMINI_MODEL,
  JWT_SECRET
} = process.env;
