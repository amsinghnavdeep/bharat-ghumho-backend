import { Router } from 'express';
import * as review from '../controllers/review.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createReviewValidation, paginationValidation, uuidParamValidation } from '../utils/validators';

const router = Router();

router.get('/', validate(paginationValidation), review.getReviews);

router.use(authenticate);
router.post('/', validate(createReviewValidation), review.createReview);
router.delete('/:id', validate(uuidParamValidation), review.deleteReview);
router.post('/:id/helpful', validate(uuidParamValidation), review.markHelpful);

export { router as reviewRouter };
