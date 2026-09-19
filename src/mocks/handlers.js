import { http, HttpResponse, delay } from 'msw';
import { SEED_LISTINGS, SEED_REVIEWS } from './seedData';
import { filterListings } from '../features/search/filterListings';

const LATENCY_MS = 400;

export const handlers = [
  http.get('/api/listings', async ({ request }) => {
    await delay(LATENCY_MS);
    const url = new URL(request.url);
    const amenitiesParam = url.searchParams.get('amenities');
    const criteria = {
      location: url.searchParams.get('location') || undefined,
      guests: url.searchParams.get('guests') || undefined,
      minPrice: url.searchParams.get('minPrice') || undefined,
      maxPrice: url.searchParams.get('maxPrice') || undefined,
      propertyType: url.searchParams.get('propertyType') || undefined,
      amenities: amenitiesParam ? amenitiesParam.split(',') : undefined,
    };
    return HttpResponse.json(filterListings(SEED_LISTINGS, criteria));
  }),

  http.get('/api/listings/:id', async ({ params }) => {
    await delay(LATENCY_MS);
    const listing = SEED_LISTINGS.find((l) => l.id === params.id);
    if (!listing) {
      return HttpResponse.json({ message: 'Listing not found' }, { status: 404 });
    }
    return HttpResponse.json(listing);
  }),

  http.get('/api/listings/:id/reviews', async ({ params }) => {
    await delay(LATENCY_MS);
    return HttpResponse.json(SEED_REVIEWS.filter((r) => r.listingId === params.id));
  }),
];
