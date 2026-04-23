import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

import { prisma } from "@/config/database";
import { s3Service } from "@/services/s3.service";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/utils/errors";
import { validators } from "@/utils/validators";

const allowedLanguages = new Set(["en", "hi", "pa", "ta", "te", "gu", "bn", "mr"]);
const allowedCurrencies = new Set(["INR", "CAD", "USD", "GBP", "EUR", "AUD", "SGD"]);
const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function getPrismaClient() {
  if (!prisma) {
    throw new BadRequestError("Database connection unavailable");
  }
  return prisma;
}

function ensureUserId(req: Request): string {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError("Access token required");
  }
  return userId;
}

function sanitizeUser<T extends { passwordHash?: string | null }>(user: T): Omit<T, "passwordHash"> {
  const { passwordHash: _passwordHash, ...sanitized } = user;
  return sanitized;
}

function getS3KeyFromUrl(url?: string | null): string | null {
  if (!url) return null;
  const cloudfrontUrl = process.env.AWS_CLOUDFRONT_URL?.replace(/\/$/, "");
  if (cloudfrontUrl && url.startsWith(`${cloudfrontUrl}/`)) {
    return url.replace(`${cloudfrontUrl}/`, "");
  }
  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET;
  const prefix = `https://${bucket}.s3.${region}.amazonaws.com/`;
  if (bucket && region && url.startsWith(prefix)) {
    return url.replace(prefix, "");
  }
  return null;
}

function getBookingDepartureDate(segments: unknown): Date | null {
  if (!Array.isArray(segments) || segments.length === 0) return null;
  const first = segments[0] as Record<string, unknown>;
  const departureCandidate = first.departureDate ?? first.departureAt ?? first.checkInDate;
  if (typeof departureCandidate !== "string") return null;
  const parsed = new Date(departureCandidate);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const db = getPrismaClient();
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const [bookingsCount, activePriceAlerts, reviewsCount] = await Promise.all([
      db.booking.count({ where: { userId } }),
      db.priceAlert.count({ where: { userId, isActive: true } }),
      db.review.count({ where: { userId } })
    ]);

    res.json({
      success: true,
      data: {
        ...sanitizeUser(user),
        counts: {
          bookings: bookingsCount,
          activePriceAlerts,
          reviews: reviewsCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const { firstName, lastName, phone } = req.body as {
      firstName?: string;
      lastName?: string;
      phone?: string;
    };
    const db = getPrismaClient();

    const updated = await db.user.update({
      where: { id: userId },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(phone !== undefined ? { phone } : {})
      }
    });

    res.json({ success: true, data: sanitizeUser(updated) });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const file = req.file;
    if (!file) {
      throw new BadRequestError("Avatar file is required");
    }
    if (!imageTypes.has(file.mimetype)) {
      throw new BadRequestError("Avatar must be jpeg, png, or webp");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestError("Avatar file size must be less than 5MB");
    }

    const ext = file.mimetype === "image/png" ? "png" : file.mimetype === "image/webp" ? "webp" : "jpg";
    const key = `avatars/${userId}/${randomUUID()}.${ext}`;
    const avatarUrl = await s3Service.uploadFile(file.buffer, key, file.mimetype);

    const db = getPrismaClient();
    const currentUser = await db.user.findUnique({ where: { id: userId } });
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl }
    });

    const oldKey = getS3KeyFromUrl(currentUser?.avatar);
    if (oldKey) {
      await s3Service.deleteFile(oldKey);
    }

    res.json({
      success: true,
      data: {
        avatarUrl: updatedUser.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const {
      language,
      currency,
      notifyEmail,
      notifyWhatsApp,
      notifySMS,
      seatPreference,
      mealPreference
    } = req.body as {
      language?: string;
      currency?: string;
      notifyEmail?: boolean;
      notifyWhatsApp?: boolean;
      notifySMS?: boolean;
      seatPreference?: string;
      mealPreference?: string;
    };

    if (language && !allowedLanguages.has(language)) {
      throw new BadRequestError("Invalid language");
    }
    if (currency && !allowedCurrencies.has(currency)) {
      throw new BadRequestError("Invalid currency");
    }

    const db = getPrismaClient();
    const updated = await db.user.update({
      where: { id: userId },
      data: {
        ...(language !== undefined ? { language } : {}),
        ...(currency !== undefined ? { currency } : {}),
        ...(notifyEmail !== undefined ? { notifyEmail } : {}),
        ...(notifyWhatsApp !== undefined ? { notifyWhatsApp } : {}),
        ...(notifySMS !== undefined ? { notifySMS } : {}),
        ...(seatPreference !== undefined ? { seatPreference } : {}),
        ...(mealPreference !== undefined ? { mealPreference } : {})
      }
    });

    res.json({
      success: true,
      data: {
        language: updated.language,
        currency: updated.currency,
        notifyEmail: updated.notifyEmail,
        notifyWhatsApp: updated.notifyWhatsApp,
        notifySMS: updated.notifySMS,
        seatPreference: updated.seatPreference,
        mealPreference: updated.mealPreference
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const status = String(req.query.status ?? "").toUpperCase();
    const page = Math.max(1, Number(req.query.page ?? 1));
    const limit = Math.min(50, Math.max(1, Number(req.query.limit ?? 10)));
    const skip = (page - 1) * limit;
    const db = getPrismaClient();

    const baseWhere = { userId };
    const allBookings = await db.booking.findMany({
      where: baseWhere,
      orderBy: { createdAt: "desc" }
    });

    const now = new Date();
    const filtered = allBookings.filter((booking) => {
      if (status === "CANCELLED") {
        return booking.status === "CANCELLED";
      }
      if (status === "COMPLETED") {
        return booking.status === "COMPLETED";
      }
      if (status === "UPCOMING") {
        const departure = getBookingDepartureDate(booking.segments);
        return (
          (booking.status === "CONFIRMED" || booking.status === "TICKETED") &&
          departure !== null &&
          departure > now
        );
      }
      return true;
    });

    const paginated = filtered.slice(skip, skip + limit);
    res.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit) || 1
      }
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const { currentPassword, newPassword, refreshToken } = req.body as {
      currentPassword: string;
      newPassword: string;
      refreshToken?: string;
    };
    if (!validators.auth.isStrongPassword(newPassword)) {
      throw new BadRequestError("Password must include upper/lowercase, number, and special character");
    }
    const db = getPrismaClient();
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user?.passwordHash) {
      throw new BadRequestError("Password change is unavailable for OAuth-only accounts");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError("Current password is incorrect");
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await db.user.update({ where: { id: userId }, data: { passwordHash } });

    if (refreshToken) {
      await db.session.deleteMany({
        where: { userId, refreshToken: { not: refreshToken } }
      });
    } else {
      await db.session.deleteMany({ where: { userId } });
    }

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const { password } = req.body as { password: string };
    const db = getPrismaClient();
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.passwordHash) {
      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        throw new UnauthorizedError("Invalid password");
      }
    }

    await db.session.deleteMany({ where: { userId } });
    await db.user.delete({ where: { id: userId } });

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSavedPassengers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const db = getPrismaClient();
    const passengers = await db.savedPassenger.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
    res.json({ success: true, data: passengers });
  } catch (error) {
    next(error);
  }
};

export const addSavedPassenger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      passportNumber,
      nationality,
      passportExpiry
    } = req.body as {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      gender: string;
      passportNumber?: string;
      nationality?: string;
      passportExpiry?: string;
    };

    const db = getPrismaClient();
    const count = await db.savedPassenger.count({ where: { userId } });
    if (count >= 10) {
      throw new BadRequestError("Maximum 10 saved passengers allowed");
    }

    const saved = await db.savedPassenger.create({
      data: {
        userId,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        passportNumber,
        nationality,
        passportExpiry: passportExpiry ? new Date(passportExpiry) : null
      }
    });

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

export const updateSavedPassenger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const { id } = req.params;
    const db = getPrismaClient();
    const existing = await db.savedPassenger.findFirst({ where: { id, userId } });
    if (!existing) {
      throw new NotFoundError("Saved passenger not found");
    }

    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      passportNumber,
      nationality,
      passportExpiry
    } = req.body as {
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      gender?: string;
      passportNumber?: string;
      nationality?: string;
      passportExpiry?: string;
    };

    const updated = await db.savedPassenger.update({
      where: { id },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(dateOfBirth !== undefined ? { dateOfBirth: new Date(dateOfBirth) } : {}),
        ...(gender !== undefined ? { gender } : {}),
        ...(passportNumber !== undefined ? { passportNumber } : {}),
        ...(nationality !== undefined ? { nationality } : {}),
        ...(passportExpiry !== undefined
          ? { passportExpiry: passportExpiry ? new Date(passportExpiry) : null }
          : {})
      }
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteSavedPassenger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUserId(req);
    const { id } = req.params;
    const db = getPrismaClient();
    const existing = await db.savedPassenger.findFirst({ where: { id, userId } });
    if (!existing) {
      throw new NotFoundError("Saved passenger not found");
    }
    await db.savedPassenger.delete({ where: { id } });
    res.json({ success: true, message: "Saved passenger deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getProfile,
  updateProfile,
  updateAvatar,
  updatePreferences,
  getUserBookings,
  getSavedPassengers,
  addSavedPassenger,
  updateSavedPassenger,
  deleteSavedPassenger,
  changePassword,
  deleteAccount
};
