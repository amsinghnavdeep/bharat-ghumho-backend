import { Router } from 'express';
import * as booking from '../controllers/booking.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createBookingValidation, paginationValidation, uuidParamValidation } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/', validate(createBookingValidation), booking.createBooking);
router.get('/', validate(paginationValidation), booking.getBookings);
router.get('/pnr/:pnr', booking.getBookingByPNR);
router.get('/:id', validate(uuidParamValidation), booking.getBooking);
router.post('/:id/cancel', validate(uuidParamValidation), booking.cancelBooking);
router.get('/:id/invoice', validate(uuidParamValidation), booking.downloadInvoice);

export { router as bookingRouter };
