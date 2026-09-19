export function filterListings(listings, criteria = {}) {
  const { location, guests, minPrice, maxPrice, propertyType, amenities } = criteria;

  return listings.filter((listing) => {
    if (location) {
      const haystack = `${listing.location.city} ${listing.location.country}`.toLowerCase();
      if (!haystack.includes(location.toLowerCase())) return false;
    }
    if (guests && listing.maxGuests < Number(guests)) return false;
    if (minPrice && listing.pricePerNight < Number(minPrice)) return false;
    if (maxPrice && listing.pricePerNight > Number(maxPrice)) return false;
    if (propertyType && listing.propertyType !== propertyType) return false;
    if (amenities && amenities.length > 0) {
      const has = new Set(listing.amenities);
      if (!amenities.every((a) => has.has(a))) return false;
    }
    return true;
  });
}
