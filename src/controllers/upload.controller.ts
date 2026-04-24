/**
 * File upload controller
 */
import { Request, Response, NextFunction } from 'express';
import { S3Service } from '../services/s3.service';
import { BadRequestError } from '../utils/errors';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new BadRequestError('No file uploaded');

    const key = `uploads/${req.user!.id}/${Date.now()}-${req.file.originalname}`;
    const url = await S3Service.uploadFile(req.file.buffer, key, req.file.mimetype);

    res.json({ success: true, data: { url, key } });
  } catch (error) { next(error); }
};

export const getPresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key, contentType } = req.query;
    if (!key || !contentType) throw new BadRequestError('Key and contentType required');

    const url = await S3Service.getPresignedUploadUrl(key as string, contentType as string);
    res.json({ success: true, data: { url } });
  } catch (error) { next(error); }
};
