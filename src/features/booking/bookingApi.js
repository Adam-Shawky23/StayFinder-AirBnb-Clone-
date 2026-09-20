import { fetchJson } from '../../lib/http';

export async function getBookedRanges(listingId) {
  const { res, data } = await fetchJson(`/api/listings/${listingId}/bookings`);
  if (!res.ok) throw new Error('Failed to load availability');
  return data;
}

export async function getUserBookings(userId) {
  const { res, data } = await fetchJson(`/api/bookings?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error('Failed to load trips');
  return data;
}

export async function createBooking(payload) {
  const { res, data } = await fetchJson('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(data?.message || 'Booking failed');
  return data;
}
