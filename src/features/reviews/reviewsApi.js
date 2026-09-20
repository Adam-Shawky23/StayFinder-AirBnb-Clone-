import { fetchJson } from '../../lib/http';

export async function getReviews(listingId) {
  const { res, data } = await fetchJson(`/api/listings/${listingId}/reviews`);
  if (!res.ok) throw new Error('Failed to load reviews');
  return data;
}
