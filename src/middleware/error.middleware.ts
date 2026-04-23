import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import multer from "multer";
import Stripe from "stripe";
import { validationResult } from "express-validator";
import * as Sentry from "@sentry/node";

import { AppError, InternalError } from "@/utils/errors";
import { logger } from "@/utils/logger";

/**
 * Centralized API error middleware with typed handling for known providers.
 */
export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  let error: AppError;
  const prismaCode = getPrismaErrorCode(err);

  if (err instanceof AppError) {
    error = err;
  } else if (prismaCode) {
    if (prismaCode === "P2002") {
      error = new AppError("Duplicate resource detected", 409);
    } else if (prismaCode === "P2025") {
      error = new AppError("Requested resource not found", 404);
    } else {
      error = new InternalError("Database operation failed");
    }
  } else if (err instanceof TokenExpiredError) {
    error = new AppError("JWT token expired", 401);
  } else if (err instanceof JsonWebTokenError) {
    error = new AppError("Invalid JWT token", 401);
  } else if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      error = new AppError("Uploaded file is too large", 400);
    } else {
      error = new AppError(`Upload failed: ${err.message}`, 400);
    }
  } else if (err instanceof Stripe.errors.StripeError) {
    error = new AppError(err.message, 402);
  } else {
    const expressValidationErrors = validationResult(req);
    if (!expressValidationErrors.isEmpty()) {
      error = new AppError("Validation failed", 422);
    } else {
      const message = err instanceof Error ? err.message : "Unexpected server error";
      error = new InternalError(message);
    }
  }

  logger.error("Request failed", {
    method: req.method,
    path: req.originalUrl,
    statusCode: error.statusCode,
    message: error.message,
    stack: err instanceof Error ? err.stack : undefined
  });

  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV !== "production" &&
      err instanceof Error && {
        stack: err.stack
      })
  });
}

function getPrismaErrorCode(err: unknown): string | null {
  if (typeof err !== "object" || err === null || !("code" in err)) {
    return null;
  }

  const { code } = err as { code?: unknown };
  return typeof code === "string" && code.startsWith("P") ? code : null;
}
