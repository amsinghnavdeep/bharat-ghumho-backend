import nodemailer from "nodemailer";

/**
 * Nodemailer transporter backed by SMTP credentials from environment.
 */
export const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
