import { Router } from 'express';
import * as user from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { upload } from '../middleware/upload.middleware';
import {
  updateProfileValidation, updatePreferencesValidation, changePasswordValidation,
  savedPassengerValidation, paginationValidation, uuidParamValidation,
} from '../utils/validators';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/me', user.getProfile);
router.put('/me', validate(updateProfileValidation), user.updateProfile);
router.put('/me/avatar', upload.single('avatar'), user.updateAvatar);
router.put('/me/preferences', validate(updatePreferencesValidation), user.updatePreferences);
router.put('/me/password', validate(changePasswordValidation), user.changePassword);
router.delete('/me', user.deleteAccount);

router.get('/me/bookings', validate(paginationValidation), user.getUserBookings);

router.get('/me/saved-passengers', user.getSavedPassengers);
router.post('/me/saved-passengers', validate(savedPassengerValidation), user.addSavedPassenger);
router.put('/me/saved-passengers/:id', validate(uuidParamValidation), user.updateSavedPassenger);
router.delete('/me/saved-passengers/:id', validate(uuidParamValidation), user.deleteSavedPassenger);

export { router as userRouter };
