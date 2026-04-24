/**
 * Review controller
 */
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { NotFoundError, BadRequestError, ConflictError } from '../utils/errors';
import { getPagination, paginatedResponse } from '../utils/helpers';

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId, rating, title, comment } = req.body;

    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId: req.user!.id, status: { in: ['COMPLETED', 'CONFIRMED', 'TICKETED'] } },
    });
    if (!booking) throw new NotFoundError('Completed booking not found');

    const existing = await prisma.review.findUnique({ where: { userId_bookingId: { userId: req.user!.id, bookingId } } });
    if (existing) throw new ConflictError('You already reviewed this booking');

    const review = await prisma.review.create({
      data: { userId: req.user!.id, bookingId, rating, title, comment },
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) { next(error); }
};

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { skip, take } = getPagination(Number(page), Number(limit));

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        skip, take, orderBy: { createdAt: 'desc' },
        include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
      }),
      prisma.review.count(),
    ]);

    res.json({ success: true, ...paginatedResponse(reviews, total, Number(page), take) });
  } catch (error) { next(error); }
};

export const markHelpful = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await prisma.review.findUnique({ where: { id: req.params.id } });
    if (!review) throw new NotFoundError('Review not found');

    const updated = await prisma.review.update({
      where: { id: req.params.id },
      data: { helpfulCount: { increment: 1 } },
    });
    res.json({ success: true, data: updated });
  } catch (error) { next(error); }
};

export const getUserReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      include: { booking: { select: { pnr: true, type: true } } },
    });
    res.json({ success: true, data: reviews });
  } catch (error) { next(error); }
};
