/**
 * AWS S3 upload/download service
 */
import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET } from '../config/s3';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

export class S3Service {
  /**
   * Upload file to S3
   */
  static async uploadFile(buffer: Buffer, key: string, contentType: string): Promise<string> {
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
          Body: buffer,
          ContentType: contentType,
        })
      );

      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
      logger.info(`S3 upload: ${key}`);
      return url;
    } catch (error) {
      logger.error(`S3 upload failed: ${key}`, error);
      throw error;
    }
  }

  /**
   * Delete file from S3
   */
  static async deleteFile(key: string): Promise<void> {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
        })
      );
      logger.info(`S3 delete: ${key}`);
    } catch (error) {
      logger.error(`S3 delete failed: ${key}`, error);
    }
  }

  /**
   * Generate presigned URL for temporary access
   */
  static async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    });
    return getSignedUrl(s3Client, command, { expiresIn });
  }

  /**
   * Upload avatar (helper)
   */
  static async uploadAvatar(userId: string, buffer: Buffer, mimeType: string): Promise<string> {
    const ext = mimeType.split('/')[1] || 'jpg';
    const key = `avatars/${userId}/${uuidv4()}.${ext}`;
    return this.uploadFile(buffer, key, mimeType);
  }

  /**
   * Upload invoice PDF
   */
  static async uploadInvoice(bookingPnr: string, buffer: Buffer): Promise<string> {
    const key = `invoices/${bookingPnr}.pdf`;
    return this.uploadFile(buffer, key, 'application/pdf');
  }
}
