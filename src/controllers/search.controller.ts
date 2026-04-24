/**
 * Search history controller
 */
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { getPagination, paginatedResponse } from '../utils/helpers';

export const getSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const { skip, take } = getPagination(Number(page), Number(limit));

    const where: any = { userId: req.user!.id };
    if (type) where.type = type;

    const [history, total] = await Promise.all([
      prisma.searchHistory.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.searchHistory.count({ where }),
    ]);

    res.json({ success: true, ...paginatedResponse(history, total, Number(page), take) });
  } catch (error) { next(error); }
};

export const clearSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.searchHistory.deleteMany({ where: { userId: req.user!.id } });
    res.json({ success: true, message: 'Search history cleared' });
  } catch (error) { next(error); }
};
