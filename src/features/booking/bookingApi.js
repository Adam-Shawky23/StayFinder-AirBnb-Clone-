export async function getBookedRanges(listingId) {
  const res = await fetch(`/api/listings/${listingId}/bookings`);
  if (!res.ok) throw new Error('Failed to load availability');
  return res.json();
}

export async function getUserBookings(userId) {
  const res = await fetch(`/api/bookings?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error('Failed to load trips');
  return res.json();
}

export async function createBooking(payload) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Booking failed');
  }
  return res.json();
}
