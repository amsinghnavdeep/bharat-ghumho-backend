/**
 * User profile management controller
 */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/database';
import { S3Service } from '../services/s3.service';
import { CacheService } from '../services/cache.service';
import { sanitizeUser, getPagination, paginatedResponse } from '../utils/helpers';
import { UnauthorizedError, NotFoundError, BadRequestError } from '../utils/errors';
import { MAX_SAVED_PASSENGERS } from '../utils/constants';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        _count: { select: { bookings: true, priceAlerts: { where: { isActive: true } }, reviews: true } },
      },
    });
    if (!user) throw new NotFoundError('User not found');
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (error) { next(error); }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const data: any = {};
    if (firstName !== undefined) data.firstName = firstName;
    if (lastName !== undefined) data.lastName = lastName;
    if (phone !== undefined) data.phone = phone;

    const user = await prisma.user.update({ where: { id: req.user!.id }, data });
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (error) { next(error); }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new BadRequestError('No file uploaded');

    const key = `avatars/${req.user!.id}/${Date.now()}-${req.file.originalname}`;
    const avatarUrl = await S3Service.uploadFile(req.file.buffer, key, req.file.mimetype);

    // Delete old avatar
    const oldUser = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (oldUser?.avatar) {
      const oldKey = oldUser.avatar.split('.com/')[1];
      if (oldKey) S3Service.deleteFile(oldKey).catch(() => {});
    }

    await prisma.user.update({ where: { id: req.user!.id }, data: { avatar: avatarUrl } });
    res.json({ success: true, data: { avatarUrl } });
  } catch (error) { next(error); }
};

export const updatePreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allowed = ['language', 'currency', 'notifyEmail', 'notifyWhatsApp', 'notifySMS', 'seatPreference', 'mealPreference'];
    const data: any = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }
    const user = await prisma.user.update({ where: { id: req.user!.id }, data });
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (error) { next(error); }
};

export const getUserBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const { skip, take } = getPagination(Number(page), Number(limit));

    const where: any = { userId: req.user!.id };
    if (status === 'UPCOMING') {
      where.status = { in: ['CONFIRMED', 'TICKETED'] };
    } else if (status === 'COMPLETED') {
      where.status = 'COMPLETED';
    } else if (status === 'CANCELLED') {
      where.status = { in: ['CANCELLED', 'REFUNDED'] };
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, include: { payment: true } }),
      prisma.booking.count({ where }),
    ]);

    res.json({ success: true, ...paginatedResponse(bookings, total, Number(page), take) });
  } catch (error) { next(error); }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user?.passwordHash) throw new BadRequestError('Account uses OAuth — no password to change');

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) throw new UnauthorizedError('Current password is incorrect');

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

    // Invalidate other sessions
    await prisma.session.deleteMany({ where: { userId: user.id } });

    res.json({ success: true, message: 'Password changed — please log in again' });
  } catch (error) { next(error); }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) throw new NotFoundError('User not found');

    if (user.passwordHash) {
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new UnauthorizedError('Invalid password');
    }

    await prisma.session.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });

    res.json({ success: true, message: 'Account deleted' });
  } catch (error) { next(error); }
};

// ========== SAVED PASSENGERS ==========
export const getSavedPassengers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const passengers = await prisma.savedPassenger.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: passengers });
  } catch (error) { next(error); }
};

export const addSavedPassenger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await prisma.savedPassenger.count({ where: { userId: req.user!.id } });
    if (count >= MAX_SAVED_PASSENGERS) throw new BadRequestError(`Maximum ${MAX_SAVED_PASSENGERS} passengers allowed`);

    const passenger = await prisma.savedPassenger.create({
      data: { userId: req.user!.id, ...req.body },
    });
    res.status(201).json({ success: true, data: passenger });
  } catch (error) { next(error); }
};

export const updateSavedPassenger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const passenger = await prisma.savedPassenger.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
    if (!passenger) throw new NotFoundError('Passenger not found');

    const updated = await prisma.savedPassenger.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: updated });
  } catch (error) { next(error); }
};

export const deleteSavedPassenger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const passenger = await prisma.savedPassenger.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
    if (!passenger) throw new NotFoundError('Passenger not found');

    await prisma.savedPassenger.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Passenger deleted' });
  } catch (error) { next(error); }
};
