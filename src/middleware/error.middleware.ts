/**
 * Centralized error handling middleware
 */
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';
import * as Sentry from '@sentry/node';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(`${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Report to Sentry in production
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(err);
  }

  // AppError (our custom errors)
  if (err instanceof AppError) {
    const response: any = {
      success: false,
      message: err.message,
    };
    if (err instanceof ValidationError && err.errors.length > 0) {
      response.errors = err.errors;
    }
    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }
    return res.status(err.statusCode).json(response);
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])?.join(', ') || 'field';
      return res.status(409).json({
        success: false,
        message: `A record with this ${field} already exists`,
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired' });
  }

  // Multer errors
  if (err.name === 'MulterError') {
    return res.status(400).json({ success: false, message: `File upload error: ${err.message}` });
  }

  // Stripe errors
  if ((err as any).type === 'StripeCardError') {
    return res.status(400).json({ success: false, message: (err as any).message });
  }
  if ((err as any).type === 'StripeInvalidRequestError') {
    return res.status(400).json({ success: false, message: 'Invalid payment request' });
  }

  // express-validator errors
  if (Array.isArray((err as any).errors)) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: (err as any).errors,
    });
  }

  // Unknown errors
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
