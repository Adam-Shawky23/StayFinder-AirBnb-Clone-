export default function BookingSummaryCard({ booking }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-soft">
      <p className="font-medium">{booking.listing.title}</p>
      <p className="text-sm text-stone-500">{booking.checkIn} → {booking.checkOut} · {booking.guests} guests</p>
      <p className="mt-1 font-semibold">${booking.totalPrice} total</p>
    </div>
  );
}
