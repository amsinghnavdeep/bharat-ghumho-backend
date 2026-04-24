/**
 * Booking controller — create, view, cancel bookings
 */
import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/booking.service';
import { InvoiceService } from '../services/invoice.service';
import { getPagination, paginatedResponse } from '../utils/helpers';
import { prisma } from '../config/database';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, flightOffer, hotelOffer, passengers, contactEmail, contactPhone, specialRequests } = req.body;

    let result;
    if (type === 'FLIGHT') {
      result = await BookingService.createFlightBooking(
        req.user!.id, flightOffer, passengers, contactEmail, contactPhone, specialRequests
      );
    } else {
      result = await BookingService.createHotelBooking(
        req.user!.id, hotelOffer, passengers, contactEmail, contactPhone, specialRequests
      );
    }

    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const getBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id, req.user!.id);
    res.json({ success: true, data: booking });
  } catch (error) { next(error); }
};

export const getBookingByPNR = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await BookingService.getBookingByPNR(req.params.pnr, req.user!.id);
    res.json({ success: true, data: booking });
  } catch (error) { next(error); }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookingService.cancelBooking(req.params.id, req.user!.id);
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, type, status } = req.query;
    const { skip, take } = getPagination(Number(page), Number(limit));

    const where: any = { userId: req.user!.id };
    if (type) where.type = type;
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, include: { payment: true } }),
      prisma.booking.count({ where }),
    ]);

    res.json({ success: true, ...paginatedResponse(bookings, total, Number(page), take) });
  } catch (error) { next(error); }
};

export const downloadInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id, req.user!.id);
    const pdfBuffer = await InvoiceService.generateInvoice(booking);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${booking.pnr}.pdf`);
    res.send(pdfBuffer);
  } catch (error) { next(error); }
};
