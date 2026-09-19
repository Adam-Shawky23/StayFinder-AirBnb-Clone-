import { differenceInCalendarDays, parseISO } from 'date-fns';

const SERVICE_FEE_RATE = 0.12;
const CLEANING_FEE = 40;

export function calculatePrice(pricePerNight, checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return { nights: 0, subtotal: 0, cleaningFee: 0, serviceFee: 0, total: 0 };
  }

  const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
  if (nights <= 0) {
    throw new Error('Check-out date must be after check-in date');
  }

  const subtotal = nights * pricePerNight;
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
  const total = subtotal + serviceFee + CLEANING_FEE;

  return { nights, subtotal, cleaningFee: CLEANING_FEE, serviceFee, total };
}
