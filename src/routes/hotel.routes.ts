import { Router } from 'express';
import * as hotel from '../controllers/hotel.controller';
import { optionalAuth } from '../middleware/auth.middleware';
import { searchLimiter } from '../middleware/rateLimiter.middleware';
import { validate } from '../middleware/validate.middleware';
import { hotelSearchValidation } from '../utils/validators';

const router = Router();

router.get('/search', searchLimiter, optionalAuth, validate(hotelSearchValidation), hotel.searchHotels);
router.get('/:hotelId/offers', hotel.getHotelOffers);

export { router as hotelRouter };
