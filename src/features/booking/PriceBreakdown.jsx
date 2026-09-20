import { calculatePrice } from './calculatePrice';

export default function PriceBreakdown({ pricePerNight, checkIn, checkOut }) {
  if (!checkIn || !checkOut) return null;
  const { nights, subtotal, cleaningFee, serviceFee, total } = calculatePrice(pricePerNight, checkIn, checkOut);

  return (
    <div className="space-y-2 border-t border-stone-200 pt-4 text-sm">
      <div className="flex justify-between">
        <span>${pricePerNight} × {nights} nights</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between text-stone-500">
        <span>Cleaning fee</span>
        <span>${cleaningFee}</span>
      </div>
      <div className="flex justify-between text-stone-500">
        <span>Service fee</span>
        <span>${serviceFee}</span>
      </div>
      <div className="flex justify-between border-t border-stone-200 pt-2 font-semibold">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
