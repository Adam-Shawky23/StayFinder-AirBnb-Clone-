export async function getReviews(listingId) {
  const res = await fetch(`/api/listings/${listingId}/reviews`);
  if (!res.ok) throw new Error('Failed to load reviews');
  return res.json();
}
