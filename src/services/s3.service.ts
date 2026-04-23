import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { s3BucketName, s3Client } from "@/config/s3";

function getPublicBaseUrl(): string {
  const cloudfrontUrl = process.env.AWS_CLOUDFRONT_URL;
  if (cloudfrontUrl) {
    return cloudfrontUrl.replace(/\/$/, "");
  }
  return `https://${s3BucketName}.s3.${process.env.AWS_REGION}.amazonaws.com`;
}

export const s3Service = {
  async uploadFile(buffer: Buffer, key: string, contentType: string): Promise<string> {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: s3BucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType
      })
    );
    return `${getPublicBaseUrl()}/${key}`;
  },

  async deleteFile(key: string): Promise<void> {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: s3BucketName,
        Key: key
      })
    );
  }
};
