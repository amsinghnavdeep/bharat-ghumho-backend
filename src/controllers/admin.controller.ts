/**
 * Admin controller — dashboard stats, user/booking management
 */
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { getPagination, paginatedResponse } from '../utils/helpers';
import dayjs from 'dayjs';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalUsers, totalBookings, totalRevenue, recentBookings, bookingsByType, bookingsByStatus] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.payment.aggregate({ where: { status: 'SUCCEEDED' }, _sum: { amount: true } }),
      prisma.booking.findMany({ take: 10, orderBy: { createdAt: 'desc' }, include: { user: { select: { firstName: true, lastName: true, email: true } }, payment: true } }),
      prisma.booking.groupBy({ by: ['type'], _count: { id: true } }),
      prisma.booking.groupBy({ by: ['status'], _count: { id: true } }),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalBookings,
        totalRevenue: totalRevenue._sum.amount || 0,
        recentBookings,
        bookingsByType,
        bookingsByStatus,
      },
    });
  } catch (error) { next(error); }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const { skip, take } = getPagination(Number(page), Number(limit));

    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search as string, mode: 'insensitive' } },
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true, isEmailVerified: true, _count: { select: { bookings: true } } } }),
      prisma.user.count({ where }),
    ]);

    res.json({ success: true, ...paginatedResponse(users, total, Number(page), take) });
  } catch (error) { next(error); }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20, type, status } = req.query;
    const { skip, take } = getPagination(Number(page), Number(limit));

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, include: { user: { select: { firstName: true, lastName: true, email: true } }, payment: true } }),
      prisma.booking.count({ where }),
    ]);

    res.json({ success: true, ...paginatedResponse(bookings, total, Number(page), take) });
  } catch (error) { next(error); }
};

export const getFestivalDeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deals = await prisma.festivalDeal.findMany({ orderBy: { startDate: 'asc' } });
    res.json({ success: true, data: deals });
  } catch (error) { next(error); }
};

export const createFestivalDeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deal = await prisma.festivalDeal.create({ data: req.body });
    res.status(201).json({ success: true, data: deal });
  } catch (error) { next(error); }
};

export const updateFestivalDeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deal = await prisma.festivalDeal.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: deal });
  } catch (error) { next(error); }
};

export const deleteFestivalDeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.festivalDeal.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deal deleted' });
  } catch (error) { next(error); }
};
