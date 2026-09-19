import { http, HttpResponse, delay } from 'msw';
import { SEED_LISTINGS, SEED_REVIEWS } from './seedData';

const LATENCY_MS = 400;

export const handlers = [
  http.get('/api/listings', async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(SEED_LISTINGS);
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
