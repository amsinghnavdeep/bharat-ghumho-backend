import { Router } from 'express';
import * as admin from '../controllers/admin.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { paginationValidation } from '../utils/validators';

const router = Router();

router.use(authenticate, requireRole('ADMIN'));

router.get('/stats', admin.getDashboardStats);
router.get('/users', validate(paginationValidation), admin.getAllUsers);
router.get('/bookings', validate(paginationValidation), admin.getAllBookings);
router.get('/revenue', admin.getRevenueStats);
router.get('/festival-deals', admin.getFestivalDeals);
router.post('/festival-deals', admin.createFestivalDeal);
router.put('/festival-deals/:id', admin.updateFestivalDeal);
router.delete('/festival-deals/:id', admin.deleteFestivalDeal);

export { router as adminRouter };
