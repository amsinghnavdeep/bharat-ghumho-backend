import twilio from "twilio";

/**
 * Twilio SDK client for WhatsApp and SMS communication.
 */
export const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID ?? "",
  process.env.TWILIO_AUTH_TOKEN ?? ""
);
