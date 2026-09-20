import { fetchJson } from '../../lib/http';

export async function getListings(params = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
  ).toString();
  const { res, data } = await fetchJson(`/api/listings${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to load listings');
  return data;
}

export async function getListing(id) {
  const { res, data } = await fetchJson(`/api/listings/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load listing');
  return data;
}
