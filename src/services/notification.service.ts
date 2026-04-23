import { emailTransporter } from "@/config/email";
import { logger } from "@/utils/logger";

async function sendMailSafe(to: string, subject: string, html: string): Promise<void> {
  if (!process.env.SMTP_USER) {
    logger.warn("SMTP_USER not configured. Skipping email send.", { to, subject });
    return;
  }

  try {
    await emailTransporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html
    });
  } catch (error) {
    logger.error("Email send failed", {
      to,
      subject,
      error: error instanceof Error ? error.message : "Unknown email error"
    });
  }
}

export const notificationService = {
  async sendEmailVerificationEmail(email: string, token: string): Promise<void> {
    const verifyUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    await sendMailSafe(
      email,
      "Verify your Bharat Ghumho account",
      `<p>Please verify your email by clicking <a href="${verifyUrl}">this link</a>.</p>`
    );
  },

  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
    await sendMailSafe(
      email,
      "Reset your Bharat Ghumho password",
      `<p>Reset your password by clicking <a href="${resetUrl}">this link</a>. This link expires in 1 hour.</p>`
    );
  }
};
