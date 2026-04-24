/**
 * Twilio client for WhatsApp + SMS notifications
 */
import twilio from 'twilio';
import { logger } from '../utils/logger';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  logger.warn('Twilio credentials not set — WhatsApp/SMS features disabled');
}

const twilioClient = accountSid && authToken ? twilio(accountSid, authToken) : null;

export { twilioClient };
export const WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || '';
export const SMS_NUMBER = process.env.TWILIO_SMS_NUMBER || '';
