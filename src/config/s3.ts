/**
 * AWS S3 client configuration
 */
import { S3Client } from '@aws-sdk/client-s3';
import { logger } from '../utils/logger';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export const S3_BUCKET = process.env.AWS_S3_BUCKET || 'bharat-ghumho-assets';

if (!process.env.AWS_ACCESS_KEY_ID) {
  logger.warn('AWS credentials not set — S3 upload features disabled');
}

export { s3Client };
