/**
 * Nodemailer transporter for sending emails
 */
import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

if (!process.env.SMTP_USER) {
  logger.warn('SMTP credentials not set — email features disabled');
}

export const FROM_EMAIL = process.env.SMTP_FROM || 'noreply@bharatghumho.com';
export { transporter };
