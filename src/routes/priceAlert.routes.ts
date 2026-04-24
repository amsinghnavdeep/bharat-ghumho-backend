import { Router } from 'express';
import * as priceAlert from '../controllers/priceAlert.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createPriceAlertValidation, uuidParamValidation } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/', validate(createPriceAlertValidation), priceAlert.createPriceAlert);
router.get('/', priceAlert.getPriceAlerts);
router.patch('/:id/toggle', validate(uuidParamValidation), priceAlert.togglePriceAlert);
router.delete('/:id', validate(uuidParamValidation), priceAlert.deletePriceAlert);

export { router as priceAlertRouter };
