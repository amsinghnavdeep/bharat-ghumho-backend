/**
 * Flight search and pricing controller
 */
import { Request, Response, NextFunction } from 'express';
import { AmadeusService } from '../services/amadeus.service';
import { prisma } from '../config/database';
import { FlightSearchParams } from '../types';

export const searchFlights = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: FlightSearchParams = {
      origin: (req.query.origin as string).toUpperCase(),
      destination: (req.query.destination as string).toUpperCase(),
      departureDate: req.query.departureDate as string,
      returnDate: req.query.returnDate as string | undefined,
      adults: parseInt(req.query.adults as string) || 1,
      children: parseInt(req.query.children as string) || 0,
      infants: parseInt(req.query.infants as string) || 0,
      cabinClass: req.query.cabinClass as string,
      nonStop: req.query.nonStop === 'true',
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      currency: (req.query.currency as string) || 'INR',
    };

    const results = await AmadeusService.searchFlights(params);

    // Save search history if authenticated
    if (req.user) {
      prisma.searchHistory.create({
        data: { userId: req.user.id, type: 'FLIGHT', query: params as any, resultCount: results.flights.length },
      }).catch(() => {}); // Don't block response
    }

    res.json({ success: true, data: results });
  } catch (error) { next(error); }
};

export const confirmFlightPrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { flightOffer } = req.body;
    const priceData = await AmadeusService.confirmFlightPrice(flightOffer);
    res.json({ success: true, data: priceData });
  } catch (error) { next(error); }
};

export const searchLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keyword = req.query.keyword as string;
    if (!keyword || keyword.length < 2) {
      return res.json({ success: true, data: [] });
    }
    const locations = await AmadeusService.searchLocations(keyword);
    res.json({ success: true, data: locations });
  } catch (error) { next(error); }
};
