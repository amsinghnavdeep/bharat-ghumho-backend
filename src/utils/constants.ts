/**
 * App-wide constants
 */

export const APP_NAME = 'Bharat Ghumho';

export const SUPPORTED_LANGUAGES = ['en', 'hi', 'pa', 'ta', 'te', 'gu', 'bn', 'mr'] as const;

export const SUPPORTED_CURRENCIES = ['INR', 'CAD', 'USD', 'GBP', 'EUR', 'AUD', 'SGD'] as const;

export const SEAT_PREFERENCES = ['window', 'aisle', 'middle'] as const;

export const MEAL_PREFERENCES = ['vegetarian', 'non-vegetarian', 'vegan', 'halal', 'jain'] as const;

export const MAX_SAVED_PASSENGERS = 10;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 10,
  maxLimit: 50,
};

export const PRICE_ALERT_CHECK_INTERVAL = '0 */6 * * *'; // Every 6 hours
export const BOOKING_REMINDER_INTERVAL = '0 9 * * *'; // Daily at 9 AM
export const CLEANUP_INTERVAL = '0 2 * * *'; // Daily at 2 AM

export const CACHE_TTL = {
  flightSearch: 300,        // 5 minutes
  hotelSearch: 600,         // 10 minutes
  airportLookup: 86400,     // 24 hours
  festivalDeals: 3600,      // 1 hour
  userProfile: 900,         // 15 minutes
};
