import { expect, test } from 'vitest';
import { calculatePrice } from './calculatePrice';

test('computes nights, subtotal, fees, and total for a 3-night stay', () => {
  const result = calculatePrice(100, '2026-10-10', '2026-10-13');
  expect(result).toEqual({
    nights: 3,
    subtotal: 300,
    cleaningFee: 40,
    serviceFee: 36,
    total: 376,
  });
});

test('returns nights of 0 and no charges when dates are missing', () => {
  expect(calculatePrice(100, '', '')).toEqual({ nights: 0, subtotal: 0, cleaningFee: 0, serviceFee: 0, total: 0 });
});

test('throws when checkout is not after checkin', () => {
  expect(() => calculatePrice(100, '2026-10-13', '2026-10-10')).toThrow();
});
