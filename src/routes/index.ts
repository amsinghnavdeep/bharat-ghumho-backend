/**
 * Route aggregator — all routes mounted from here
 */
import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { flightRouter } from './flight.routes';
import { hotelRouter } from './hotel.routes';
import { bookingRouter } from './booking.routes';
import { paymentRouter } from './payment.routes';
import { priceAlertRouter } from './priceAlert.routes';
import { reviewRouter } from './review.routes';
import { searchRouter } from './search.routes';
import { adminRouter } from './admin.routes';
import { uploadRouter } from './upload.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/flights', flightRouter);
router.use('/hotels', hotelRouter);
router.use('/bookings', bookingRouter);
router.use('/payments', paymentRouter);
router.use('/price-alerts', priceAlertRouter);
router.use('/reviews', reviewRouter);
router.use('/search-history', searchRouter);
router.use('/admin', adminRouter);
router.use('/upload', uploadRouter);

export default router;
