/**
 * Express-validator validation schemas for all routes
 */
import { body, query, param } from 'express-validator';
import { SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES, SEAT_PREFERENCES, MEAL_PREFERENCES } from './constants';

// ========== AUTH ==========
export const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .withMessage('Password must include uppercase, lowercase, number, and special character'),
  body('firstName').trim().notEmpty().withMessage('First name required'),
  body('lastName').trim().notEmpty().withMessage('Last name required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number required'),
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];

export const refreshTokenValidation = [
  body('refreshToken').notEmpty().withMessage('Refresh token required'),
];

export const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
];

export const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token required'),
  body('newPassword')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .withMessage('Strong password required'),
];

export const verifyEmailValidation = [
  body('token').notEmpty().withMessage('Token required'),
];

export const oauthValidation = [
  body('idToken').notEmpty().withMessage('ID token required'),
];

// ========== USER ==========
export const updateProfileValidation = [
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('phone').optional().isMobilePhone('any'),
];

export const updatePreferencesValidation = [
  body('language').optional().isIn([...SUPPORTED_LANGUAGES]),
  body('currency').optional().isIn([...SUPPORTED_CURRENCIES]),
  body('seatPreference').optional().isIn([...SEAT_PREFERENCES]),
  body('mealPreference').optional().isIn([...MEAL_PREFERENCES]),
  body('notifyEmail').optional().isBoolean(),
  body('notifyWhatsApp').optional().isBoolean(),
  body('notifySMS').optional().isBoolean(),
];

export const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password required'),
  body('newPassword')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .withMessage('Strong password required'),
];

export const savedPassengerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name required'),
  body('lastName').trim().notEmpty().withMessage('Last name required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender required'),
  body('passportNumber').optional().trim(),
  body('nationality').optional().trim(),
  body('passportExpiry').optional().isISO8601(),
];

// ========== FLIGHTS ==========
export const flightSearchValidation = [
  query('origin').isLength({ min: 3, max: 3 }).isAlpha().toUpperCase().withMessage('Valid IATA origin code required'),
  query('destination').isLength({ min: 3, max: 3 }).isAlpha().toUpperCase().withMessage('Valid IATA destination required'),
  query('departureDate').isISO8601().withMessage('Valid departure date required'),
  query('returnDate').optional().isISO8601(),
  query('adults').optional().isInt({ min: 1, max: 9 }).toInt(),
  query('children').optional().isInt({ min: 0, max: 9 }).toInt(),
  query('infants').optional().isInt({ min: 0, max: 4 }).toInt(),
  query('cabinClass').optional().isIn(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']),
  query('nonStop').optional().isBoolean(),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('currency').optional().isIn([...SUPPORTED_CURRENCIES]),
];

export const flightPriceValidation = [
  body('flightOffer').notEmpty().withMessage('Flight offer data required'),
];

// ========== HOTELS ==========
export const hotelSearchValidation = [
  query('cityCode').isLength({ min: 3, max: 3 }).isAlpha().toUpperCase().withMessage('Valid city code required'),
  query('checkInDate').isISO8601().withMessage('Valid check-in date required'),
  query('checkOutDate').isISO8601().withMessage('Valid check-out date required'),
  query('adults').optional().isInt({ min: 1, max: 9 }).toInt(),
  query('rooms').optional().isInt({ min: 1, max: 5 }).toInt(),
  query('currency').optional().isIn([...SUPPORTED_CURRENCIES]),
];

// ========== BOOKING ==========
export const createBookingValidation = [
  body('type').isIn(['FLIGHT', 'HOTEL']).withMessage('Valid booking type required'),
  body('flightOffer').optional(),
  body('hotelOffer').optional(),
  body('passengers').isArray({ min: 1 }).withMessage('At least one passenger required'),
  body('passengers.*.firstName').trim().notEmpty(),
  body('passengers.*.lastName').trim().notEmpty(),
  body('passengers.*.dateOfBirth').isISO8601(),
  body('passengers.*.gender').isIn(['male', 'female', 'other']),
  body('contactEmail').isEmail(),
  body('contactPhone').isMobilePhone('any'),
  body('specialRequests').optional().isString(),
];

// ========== PAYMENT ==========
export const createPaymentValidation = [
  body('bookingId').isUUID().withMessage('Valid booking ID required'),
  body('currency').optional().isIn([...SUPPORTED_CURRENCIES]),
];

export const confirmPaymentValidation = [
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID required'),
];

// ========== PRICE ALERTS ==========
export const createPriceAlertValidation = [
  body('origin').isLength({ min: 3, max: 3 }).isAlpha().toUpperCase(),
  body('destination').isLength({ min: 3, max: 3 }).isAlpha().toUpperCase(),
  body('departureDate').isISO8601(),
  body('returnDate').optional().isISO8601(),
  body('targetPrice').isFloat({ min: 1 }),
  body('currency').optional().isIn([...SUPPORTED_CURRENCIES]),
  body('cabinClass').optional().isIn(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']),
  body('alertMethod').optional().isIn(['EMAIL', 'WHATSAPP', 'BOTH']),
];

// ========== REVIEWS ==========
export const createReviewValidation = [
  body('bookingId').isUUID().withMessage('Valid booking ID required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('title').optional().trim().isLength({ max: 200 }),
  body('comment').trim().notEmpty().isLength({ max: 2000 }),
];

// ========== SEARCH ==========
export const searchHistoryValidation = [
  query('type').optional().isIn(['FLIGHT', 'HOTEL']),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
];

// ========== PAGINATION ==========
export const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
];

// ========== PARAM VALIDATION ==========
export const uuidParamValidation = [
  param('id').isUUID().withMessage('Valid ID required'),
];
