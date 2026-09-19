export default function BookingSummaryCard({ booking }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <p className="font-medium">{booking.listing.title}</p>
      <p className="text-sm text-gray-500">{booking.checkIn} → {booking.checkOut} · {booking.guests} guests</p>
      <p className="mt-1 font-semibold">${booking.totalPrice} total</p>
    </div>
  );
}
