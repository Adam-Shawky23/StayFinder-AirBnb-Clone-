import { http, HttpResponse, delay } from 'msw';
import { SEED_LISTINGS, SEED_REVIEWS, SEED_USERS } from './seedData';
import { filterListings } from '../features/search/filterListings';
import { getDb, updateDb } from './db';

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

  http.post('/api/auth/signup', async ({ request }) => {
    await delay(LATENCY_MS);
    const { name, email, password } = await request.json();
    const db = getDb();
    const allUsers = [...SEED_USERS, ...db.users];
    if (allUsers.some((u) => u.email === email)) {
      return HttpResponse.json({ message: 'An account with that email already exists' }, { status: 409 });
    }
    const user = { id: crypto.randomUUID(), name, email, password };
    updateDb((d) => d.users.push(user));
    const { password: _pw, ...publicUser } = user;
    return HttpResponse.json({ user: publicUser, token: crypto.randomUUID() }, { status: 201 });
  }),

  http.post('/api/auth/login', async ({ request }) => {
    await delay(LATENCY_MS);
    const { email, password } = await request.json();
    const db = getDb();
    const allUsers = [...SEED_USERS, ...db.users];
    const user = allUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
    const { password: _pw, ...publicUser } = user;
    return HttpResponse.json({ user: publicUser, token: crypto.randomUUID() });
  }),

  http.get('/api/wishlist', async ({ request }) => {
    await delay(LATENCY_MS);
    const userId = new URL(request.url).searchParams.get('userId');
    const db = getDb();
    const listingIds = db.wishlist.filter((w) => w.userId === userId).map((w) => w.listingId);
    const listings = SEED_LISTINGS.filter((l) => listingIds.includes(l.id));
    return HttpResponse.json(listings);
  }),

  http.post('/api/wishlist', async ({ request }) => {
    await delay(LATENCY_MS);
    const { userId, listingId } = await request.json();
    updateDb((db) => {
      if (!db.wishlist.some((w) => w.userId === userId && w.listingId === listingId)) {
        db.wishlist.push({ userId, listingId });
      }
    });
    return HttpResponse.json({ ok: true }, { status: 201 });
  }),

  http.delete('/api/wishlist/:listingId', async ({ request, params }) => {
    await delay(LATENCY_MS);
    const userId = new URL(request.url).searchParams.get('userId');
    updateDb((db) => {
      db.wishlist = db.wishlist.filter((w) => !(w.userId === userId && w.listingId === params.listingId));
    });
    return HttpResponse.json({ ok: true });
  }),
];
