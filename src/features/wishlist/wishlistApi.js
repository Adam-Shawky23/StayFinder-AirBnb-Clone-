import { fetchJson } from '../../lib/http';

export async function getWishlist(userId) {
  const { res, data } = await fetchJson(`/api/wishlist?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error('Failed to load wishlist');
  return data;
}

export async function addToWishlist(userId, listingId) {
  const { res } = await fetchJson('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, listingId }),
  });
  if (!res.ok) throw new Error('Failed to add to wishlist');
}

export async function removeFromWishlist(userId, listingId) {
  const { res } = await fetchJson(`/api/wishlist/${listingId}?userId=${encodeURIComponent(userId)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to remove from wishlist');
}
