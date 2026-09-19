export async function getListings(params = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
  ).toString();
  const res = await fetch(`/api/listings${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to load listings');
  return res.json();
}

export async function getListing(id) {
  const res = await fetch(`/api/listings/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load listing');
  return res.json();
}
