import { expect, test } from 'vitest';
import { filterListings } from './filterListings';

const listings = [
  { id: 'a', location: { city: 'Paris', country: 'France' }, pricePerNight: 100, maxGuests: 2, propertyType: 'Apartment', amenities: ['Wifi', 'Kitchen'] },
  { id: 'b', location: { city: 'New York', country: 'USA' }, pricePerNight: 250, maxGuests: 6, propertyType: 'Entire home', amenities: ['Wifi', 'Pool'] },
  { id: 'c', location: { city: 'Paris', country: 'France' }, pricePerNight: 60, maxGuests: 4, propertyType: 'Private room', amenities: ['Wifi'] },
];

test('returns all listings when criteria is empty', () => {
  expect(filterListings(listings, {})).toHaveLength(3);
});

test('filters by location, case-insensitively, matching city or country', () => {
  expect(filterListings(listings, { location: 'paris' }).map((l) => l.id)).toEqual(['a', 'c']);
});

test('filters by minimum guest capacity', () => {
  expect(filterListings(listings, { guests: 5 }).map((l) => l.id)).toEqual(['b']);
});

test('filters by price range', () => {
  expect(filterListings(listings, { minPrice: 80, maxPrice: 200 }).map((l) => l.id)).toEqual(['a']);
});

test('filters by exact property type', () => {
  expect(filterListings(listings, { propertyType: 'Private room' }).map((l) => l.id)).toEqual(['c']);
});

test('filters by amenities, requiring all requested amenities to be present', () => {
  expect(filterListings(listings, { amenities: ['Wifi', 'Pool'] }).map((l) => l.id)).toEqual(['b']);
});

test('combines multiple criteria with AND semantics', () => {
  expect(filterListings(listings, { location: 'paris', maxPrice: 80 }).map((l) => l.id)).toEqual(['c']);
});
