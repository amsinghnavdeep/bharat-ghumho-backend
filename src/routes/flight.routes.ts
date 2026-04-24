import { Router } from 'express';
import * as flight from '../controllers/flight.controller';
import { optionalAuth } from '../middleware/auth.middleware';
import { searchLimiter } from '../middleware/rateLimiter.middleware';
import { validate } from '../middleware/validate.middleware';
import { flightSearchValidation, flightPriceValidation } from '../utils/validators';

const router = Router();

router.get('/search', searchLimiter, optionalAuth, validate(flightSearchValidation), flight.searchFlights);
router.post('/price', optionalAuth, validate(flightPriceValidation), flight.confirmFlightPrice);
router.get('/locations', flight.searchLocations);

export { router as flightRouter };
