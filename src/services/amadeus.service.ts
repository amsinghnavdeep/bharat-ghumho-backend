/**
 * Amadeus API wrapper — flight and hotel search, pricing, booking
 */
import { amadeus } from '../config/amadeus';
import { CacheService } from './cache.service';
import { logger } from '../utils/logger';
import { CACHE_TTL } from '../utils/constants';
import { FlightSearchParams, HotelSearchParams } from '../types';
import { AppError } from '../utils/errors';

export class AmadeusService {
  /**
   * Search flights
   */
  static async searchFlights(params: FlightSearchParams) {
    const cacheKey = `flights:${JSON.stringify(params)}`;

    return CacheService.getOrSet(
      cacheKey,
      async () => {
        try {
          const searchParams: any = {
            originLocationCode: params.origin,
            destinationLocationCode: params.destination,
            departureDate: params.departureDate,
            adults: params.adults || 1,
            currencyCode: params.currency || 'INR',
            max: 50,
          };

          if (params.returnDate) searchParams.returnDate = params.returnDate;
          if (params.children) searchParams.children = params.children;
          if (params.infants) searchParams.infants = params.infants;
          if (params.cabinClass) searchParams.travelClass = params.cabinClass;
          if (params.nonStop) searchParams.nonStop = params.nonStop;
          if (params.maxPrice) searchParams.maxPrice = params.maxPrice;

          const response = await amadeus.shopping.flightOffersSearch.get(searchParams);

          logger.info(`Flight search: ${params.origin} → ${params.destination}, ${response.data.length} results`);

          return {
            flights: response.data,
            dictionaries: response.result?.dictionaries || {},
            meta: response.result?.meta || {},
          };
        } catch (error: any) {
          logger.error('Amadeus flight search error:', error?.response?.result || error.message);
          throw new AppError(
            error?.response?.result?.errors?.[0]?.detail || 'Flight search failed',
            error?.response?.statusCode || 500
          );
        }
      },
      CACHE_TTL.flightSearch
    );
  }

  /**
   * Confirm flight price before booking
   */
  static async confirmFlightPrice(flightOffer: any) {
    try {
      const response = await amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({ data: { type: 'flight-offers-pricing', flightOffers: [flightOffer] } })
      );

      logger.info('Flight price confirmed');
      return response.data;
    } catch (error: any) {
      logger.error('Amadeus price confirmation error:', error?.response?.result || error.message);
      throw new AppError(
        error?.response?.result?.errors?.[0]?.detail || 'Price confirmation failed',
        error?.response?.statusCode || 500
      );
    }
  }

  /**
   * Create flight booking (PNR)
   */
  static async createFlightOrder(flightOffer: any, travelers: any[], contact: { email: string; phone: string }) {
    try {
      const response = await amadeus.booking.flightOrders.post(
        JSON.stringify({
          data: {
            type: 'flight-order',
            flightOffers: [flightOffer],
            travelers,
            remarks: { general: [{ subType: 'GENERAL_MISCELLANEOUS', text: 'Booked via Bharat Ghumho' }] },
            ticketingAgreement: { option: 'DELAY_TO_QUEUE' },
            contacts: [
              {
                addresseeName: { firstName: travelers[0].name.firstName, lastName: travelers[0].name.lastName },
                purpose: 'STANDARD',
                phoneDeviceType: 'MOBILE',
                emailAddress: contact.email,
                phones: [{ deviceType: 'MOBILE', countryCallingCode: '91', number: contact.phone }],
              },
            ],
          },
        })
      );

      logger.info(`Flight order created: ${response.data.id}`);
      return response.data;
    } catch (error: any) {
      logger.error('Amadeus booking error:', error?.response?.result || error.message);
      throw new AppError(
        error?.response?.result?.errors?.[0]?.detail || 'Booking failed',
        error?.response?.statusCode || 500
      );
    }
  }

  /**
   * Search hotels by city
   */
  static async searchHotelsByCity(params: HotelSearchParams) {
    const cacheKey = `hotels:${JSON.stringify(params)}`;

    return CacheService.getOrSet(
      cacheKey,
      async () => {
        try {
          // Step 1: Get hotel list by city
          const hotelListResponse = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: params.cityCode,
          });

          const hotelIds = hotelListResponse.data
            .slice(0, 20)
            .map((h: any) => h.hotelId);

          if (hotelIds.length === 0) {
            return { hotels: [], meta: {} };
          }

          // Step 2: Get offers for those hotels
          const offersResponse = await amadeus.shopping.hotelOffersSearch.get({
            hotelIds: hotelIds.join(','),
            checkInDate: params.checkInDate,
            checkOutDate: params.checkOutDate,
            adults: params.adults || 1,
            roomQuantity: params.rooms || 1,
            currency: params.currency || 'INR',
          });

          logger.info(`Hotel search: ${params.cityCode}, ${offersResponse.data.length} results`);

          return {
            hotels: offersResponse.data,
            meta: offersResponse.result?.meta || {},
          };
        } catch (error: any) {
          logger.error('Amadeus hotel search error:', error?.response?.result || error.message);
          throw new AppError(
            error?.response?.result?.errors?.[0]?.detail || 'Hotel search failed',
            error?.response?.statusCode || 500
          );
        }
      },
      CACHE_TTL.hotelSearch
    );
  }

  /**
   * Get hotel offers for a specific hotel
   */
  static async getHotelOffers(hotelId: string, checkInDate: string, checkOutDate: string, adults = 1) {
    try {
      const response = await amadeus.shopping.hotelOfferSearch.get({
        hotelId,
        checkInDate,
        checkOutDate,
        adults,
      });

      return response.data;
    } catch (error: any) {
      logger.error('Amadeus hotel offer error:', error?.response?.result || error.message);
      throw new AppError('Hotel offer lookup failed', error?.response?.statusCode || 500);
    }
  }

  /**
   * Book hotel room
   */
  static async bookHotel(offerId: string, guests: any[]) {
    try {
      const response = await amadeus.booking.hotelBookings.post(
        JSON.stringify({
          data: {
            offerId,
            guests,
            payments: [
              {
                method: 'CREDIT_CARD',
                card: { vendorCode: 'VI', cardNumber: '0000000000000000', expiryDate: '2030-01' },
              },
            ],
          },
        })
      );

      logger.info(`Hotel booking created: ${response.data[0]?.id}`);
      return response.data;
    } catch (error: any) {
      logger.error('Amadeus hotel booking error:', error?.response?.result || error.message);
      throw new AppError('Hotel booking failed', error?.response?.statusCode || 500);
    }
  }

  /**
   * Search airports/cities for autocomplete
   */
  static async searchLocations(keyword: string) {
    const cacheKey = `airports:${keyword.toLowerCase()}`;

    return CacheService.getOrSet(
      cacheKey,
      async () => {
        try {
          const response = await amadeus.referenceData.locations.get({
            keyword,
            subType: 'CITY,AIRPORT',
          });
          return response.data;
        } catch (error: any) {
          logger.error('Amadeus location search error:', error.message);
          return [];
        }
      },
      CACHE_TTL.airportLookup
    );
  }
}
