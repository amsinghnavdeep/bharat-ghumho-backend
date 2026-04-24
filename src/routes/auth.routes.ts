import { Router } from 'express';
import * as auth from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimiter.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  registerValidation, loginValidation, refreshTokenValidation,
  forgotPasswordValidation, resetPasswordValidation, verifyEmailValidation, oauthValidation,
} from '../utils/validators';

const router = Router();

router.post('/register', authLimiter, validate(registerValidation), auth.register);
router.post('/login', authLimiter, validate(loginValidation), auth.login);
router.post('/refresh', validate(refreshTokenValidation), auth.refreshTokenHandler);
router.post('/logout', authenticate, auth.logout);
router.post('/forgot-password', authLimiter, validate(forgotPasswordValidation), auth.forgotPassword);
router.post('/reset-password', validate(resetPasswordValidation), auth.resetPassword);
router.post('/verify-email', validate(verifyEmailValidation), auth.verifyEmail);
router.post('/google', validate(oauthValidation), auth.googleAuth);
router.post('/apple', validate(oauthValidation), auth.appleAuth);

export { router as authRouter };
