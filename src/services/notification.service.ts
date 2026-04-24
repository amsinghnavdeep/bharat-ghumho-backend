/**
 * Notification service — Email, WhatsApp, SMS
 */
import { transporter, FROM_EMAIL } from '../config/email';
import { twilioClient, WHATSAPP_NUMBER, SMS_NUMBER } from '../config/twilio';
import { logger } from '../utils/logger';
import { APP_NAME } from '../utils/constants';

export class NotificationService {
  /**
   * Send email
   */
  static async sendEmail(to: string, subject: string, html: string, text?: string) {
    try {
      if (!process.env.SMTP_USER) {
        logger.warn(`Email not sent (SMTP not configured): ${subject} → ${to}`);
        return;
      }

      await transporter.sendMail({
        from: `"${APP_NAME}" <${FROM_EMAIL}>`,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''),
      });

      logger.info(`Email sent: ${subject} → ${to}`);
    } catch (error) {
      logger.error(`Email send failed: ${subject} → ${to}`, error);
    }
  }

  /**
   * Send WhatsApp message via Twilio
   */
  static async sendWhatsApp(to: string, body: string) {
    try {
      if (!twilioClient || !WHATSAPP_NUMBER) {
        logger.warn(`WhatsApp not sent (Twilio not configured): ${to}`);
        return;
      }

      const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

      await twilioClient.messages.create({
        body,
        from: WHATSAPP_NUMBER,
        to: formattedTo,
      });

      logger.info(`WhatsApp sent → ${to}`);
    } catch (error) {
      logger.error(`WhatsApp send failed → ${to}`, error);
    }
  }

  /**
   * Send SMS via Twilio
   */
  static async sendSMS(to: string, body: string) {
    try {
      if (!twilioClient || !SMS_NUMBER) {
        logger.warn(`SMS not sent (Twilio not configured): ${to}`);
        return;
      }

      await twilioClient.messages.create({
        body,
        from: SMS_NUMBER,
        to,
      });

      logger.info(`SMS sent → ${to}`);
    } catch (error) {
      logger.error(`SMS send failed → ${to}`, error);
    }
  }

  // ========== EMAIL TEMPLATES ==========

  static async sendWelcomeEmail(email: string, firstName: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF6B00;">Welcome to ${APP_NAME}! 🇮🇳✈️</h1>
        <p>Hi ${firstName},</p>
        <p>Thank you for joining Bharat Ghumho — your gateway to India and beyond!</p>
        <p>Start exploring flights and hotels at the best prices, with features built just for the Indian diaspora.</p>
        <p>Happy travels!<br/>Team Bharat Ghumho</p>
      </div>
    `;
    await this.sendEmail(email, `Welcome to ${APP_NAME}! 🇮🇳`, html);
  }

  static async sendEmailVerification(email: string, firstName: string, token: string) {
    const verifyUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B00;">Verify Your Email</h2>
        <p>Hi ${firstName},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <p><a href="${verifyUrl}" style="background: #FF6B00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email</a></p>
        <p style="color: #888; font-size: 12px;">This link expires in 24 hours.</p>
      </div>
    `;
    await this.sendEmail(email, 'Verify your email — Bharat Ghumho', html);
  }

  static async sendPasswordReset(email: string, firstName: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B00;">Reset Your Password</h2>
        <p>Hi ${firstName},</p>
        <p>Click below to reset your password:</p>
        <p><a href="${resetUrl}" style="background: #FF6B00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a></p>
        <p style="color: #888; font-size: 12px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      </div>
    `;
    await this.sendEmail(email, 'Password Reset — Bharat Ghumho', html);
  }

  static async sendBookingConfirmation(email: string, firstName: string, booking: any) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B00;">Booking Confirmed! ✅</h2>
        <p>Hi ${firstName},</p>
        <p>Your ${booking.type.toLowerCase()} booking has been confirmed.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; font-weight: bold;">PNR:</td><td style="padding: 8px;">${booking.pnr}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Amount:</td><td style="padding: 8px;">${booking.currency} ${booking.totalAmount}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Status:</td><td style="padding: 8px;">${booking.status}</td></tr>
        </table>
        <p>You can view your booking details in your dashboard.</p>
        <p>Safe travels! ✈️<br/>Team Bharat Ghumho</p>
      </div>
    `;
    await this.sendEmail(email, `Booking Confirmed — ${booking.pnr}`, html);
  }

  static async sendPriceAlert(email: string, firstName: string, alert: any, currentPrice: number) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B00;">Price Alert! 🔔</h2>
        <p>Hi ${firstName},</p>
        <p>Great news! The price for your watched route has dropped:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; font-weight: bold;">Route:</td><td style="padding: 8px;">${alert.origin} → ${alert.destination}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Date:</td><td style="padding: 8px;">${alert.departureDate}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Target Price:</td><td style="padding: 8px;">${alert.currency} ${alert.targetPrice}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: green;">Current Price:</td><td style="padding: 8px; color: green; font-weight: bold;">${alert.currency} ${currentPrice}</td></tr>
        </table>
        <p><a href="${process.env.FRONTEND_URL}/flights?origin=${alert.origin}&destination=${alert.destination}&date=${alert.departureDate}" style="background: #FF6B00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Book Now</a></p>
      </div>
    `;
    await this.sendEmail(email, `Price Drop Alert: ${alert.origin} → ${alert.destination}`, html);
  }

  static async sendBookingReminder(email: string, firstName: string, booking: any, daysUntil: number) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6B00;">Travel Reminder ✈️</h2>
        <p>Hi ${firstName},</p>
        <p>Your trip is in <strong>${daysUntil} day${daysUntil > 1 ? 's' : ''}</strong>!</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; font-weight: bold;">PNR:</td><td style="padding: 8px;">${booking.pnr}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Type:</td><td style="padding: 8px;">${booking.type}</td></tr>
        </table>
        <p>Don't forget to check in and have your documents ready!</p>
        <p>Safe travels!<br/>Team Bharat Ghumho</p>
      </div>
    `;
    await this.sendEmail(email, `Travel Reminder: ${daysUntil} days to go!`, html);
  }
}
