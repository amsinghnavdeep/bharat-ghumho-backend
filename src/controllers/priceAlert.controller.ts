/**
 * Price alert controller — CRUD for price alerts
 */
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { NotFoundError, BadRequestError } from '../utils/errors';
import dayjs from 'dayjs';

export const createPriceAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { origin, destination, departureDate, returnDate, targetPrice, currency, cabinClass, alertMethod } = req.body;

    const activeAlerts = await prisma.priceAlert.count({ where: { userId: req.user!.id, isActive: true } });
    if (activeAlerts >= 10) throw new BadRequestError('Maximum 10 active price alerts allowed');

    const alert = await prisma.priceAlert.create({
      data: {
        userId: req.user!.id,
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureDate: new Date(departureDate),
        returnDate: returnDate ? new Date(returnDate) : null,
        targetPrice,
        currency: currency || 'INR',
        cabinClass: cabinClass || 'ECONOMY',
        alertMethod: alertMethod || 'EMAIL',
        expiresAt: dayjs().add(30, 'day').toDate(),
      },
    });

    res.status(201).json({ success: true, data: alert });
  } catch (error) { next(error); }
};

export const getPriceAlerts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alerts = await prisma.priceAlert.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: alerts });
  } catch (error) { next(error); }
};

export const deletePriceAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alert = await prisma.priceAlert.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
    if (!alert) throw new NotFoundError('Price alert not found');

    await prisma.priceAlert.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Price alert deleted' });
  } catch (error) { next(error); }
};

export const togglePriceAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alert = await prisma.priceAlert.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
    if (!alert) throw new NotFoundError('Price alert not found');

    const updated = await prisma.priceAlert.update({
      where: { id: req.params.id },
      data: { isActive: !alert.isActive },
    });
    res.json({ success: true, data: updated });
  } catch (error) { next(error); }
};
