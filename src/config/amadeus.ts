/**
 * Amadeus SDK initialization — Canadian Corp credentials
 */
import Amadeus from 'amadeus';
import { logger } from '../utils/logger';

const hostname = (process.env.AMADEUS_HOSTNAME as 'test' | 'production') || 'test';

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID || '',
  clientSecret: process.env.AMADEUS_CLIENT_SECRET || '',
  hostname,
});

logger.info(`Amadeus SDK initialized in ${hostname} mode`);

export { amadeus };
