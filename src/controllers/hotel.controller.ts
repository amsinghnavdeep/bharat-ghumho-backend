/**
 * Hotel search controller
 */
import { Request, Response, NextFunction } from 'express';
import { AmadeusService } from '../services/amadeus.service';
import { prisma } from '../config/database';
import { HotelSearchParams } from '../types';

export const searchHotels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: HotelSearchParams = {
      cityCode: (req.query.cityCode as string).toUpperCase(),
      checkInDate: req.query.checkInDate as string,
      checkOutDate: req.query.checkOutDate as string,
      adults: parseInt(req.query.adults as string) || 1,
      rooms: parseInt(req.query.rooms as string) || 1,
      currency: (req.query.currency as string) || 'INR',
    };

    const results = await AmadeusService.searchHotelsByCity(params);

    if (req.user) {
      prisma.searchHistory.create({
        data: { userId: req.user.id, type: 'HOTEL', query: params as any, resultCount: results.hotels.length },
      }).catch(() => {});
    }

    res.json({ success: true, data: results });
  } catch (error) { next(error); }
};

export const getHotelOffers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hotelId } = req.params;
    const { checkInDate, checkOutDate, adults } = req.query;

    const offers = await AmadeusService.getHotelOffers(
      hotelId,
      checkInDate as string,
      checkOutDate as string,
      parseInt(adults as string) || 1
    );

    res.json({ success: true, data: offers });
  } catch (error) { next(error); }
};
