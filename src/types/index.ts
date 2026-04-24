/**
 * Shared application types
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface JwtPayload {
  userId: string;
  type: 'access' | 'refresh';
  purpose?: 'email-verify' | 'password-reset';
  iat?: number;
  exp?: number;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  cabinClass?: string;
  nonStop?: boolean;
  maxPrice?: number;
  currency?: string;
}

export interface HotelSearchParams {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  adults?: number;
  rooms?: number;
  currency?: string;
  priceRange?: string;
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  passportNumber?: string;
  nationality?: string;
  passportExpiry?: string;
}

export * from './amadeus.d';
