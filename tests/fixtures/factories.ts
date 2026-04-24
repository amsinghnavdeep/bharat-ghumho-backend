/**
 * Test data factories
 */

export const createTestUser = (overrides = {}) => ({
  email: `test-${Date.now()}@bharatghumho.com`,
  password: 'Test123!@',
  firstName: 'Test',
  lastName: 'User',
  ...overrides,
});

export const createTestFlightSearch = (overrides = {}) => ({
  origin: 'YYZ',
  destination: 'DEL',
  departureDate: '2026-12-15',
  adults: 1,
  cabinClass: 'ECONOMY',
  currency: 'INR',
  ...overrides,
});

export const createTestPassenger = (overrides = {}) => ({
  firstName: 'Raj',
  lastName: 'Kumar',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  passportNumber: 'A1234567',
  nationality: 'IN',
  passportExpiry: '2030-05-15',
  ...overrides,
});
