import { Router } from 'express';
import * as search from '../controllers/search.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { searchHistoryValidation, uuidParamValidation } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.get('/', validate(searchHistoryValidation), search.getSearchHistory);
router.delete('/:id', validate(uuidParamValidation), search.deleteSearchEntry);
router.delete('/', search.clearSearchHistory);

export { router as searchRouter };
