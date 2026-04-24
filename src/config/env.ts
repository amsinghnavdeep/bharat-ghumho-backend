/**
 * Environment variable validation — app won't start if required vars are missing
 */

const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'REDIS_URL',
] as const;

const optional = [
  'AMADEUS_CLIENT_ID', 'AMADEUS_CLIENT_SECRET',
  'STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY', 'STRIPE_WEBHOOK_SECRET',
  'TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_WHATSAPP_NUMBER',
  'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_S3_BUCKET',
  'SENTRY_DSN', 'SMTP_HOST', 'SMTP_USER', 'SMTP_PASS',
  'GOOGLE_CLIENT_ID', 'APPLE_CLIENT_ID',
] as const;

export function validateEnv(): void {
  const missing = required.filter(
    (key) => !process.env[key] || process.env[key]!.trim() === ''
  );

  if (missing.length > 0) {
    console.error('\n❌ Missing required environment variables:');
    missing.forEach((k) => console.error(`   - ${k}`));
    console.error('\nCopy .env.example to .env and fill in values.\n');
    process.exit(1);
  }

  const missingOpt = optional.filter((k) => !process.env[k]);
  if (missingOpt.length > 0) {
    console.warn('\n⚠️  Optional env vars not set (some features disabled):');
    missingOpt.forEach((k) => console.warn(`   - ${k}`));
    console.warn('');
  }
}
