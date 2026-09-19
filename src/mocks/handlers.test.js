import { beforeEach, expect, test } from 'vitest';

beforeEach(() => {
  localStorage.clear();
});

test('GET /api/listings returns all seed listings', async () => {
  const res = await fetch('/api/listings');
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.length).toBe(12);
});

test('GET /api/listings/:id returns a single listing', async () => {
  const res = await fetch('/api/listings/l1');
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.id).toBe('l1');
});

test('GET /api/listings/:id returns 404 for an unknown id', async () => {
  const res = await fetch('/api/listings/does-not-exist');
  expect(res.status).toBe(404);
});

test('GET /api/listings/:id/reviews returns that listing\'s reviews', async () => {
  const res = await fetch('/api/listings/l1/reviews');
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.every((r) => r.listingId === 'l1')).toBe(true);
});

test('POST /api/bookings rejects a range that overlaps an existing booking for the same listing', async () => {
  const first = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      listingId: 'l1', userId: 'u1', checkIn: '2026-10-10', checkOut: '2026-10-13', guests: 1,
    }),
  });
  expect(first.status).toBe(201);

  const overlapping = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      listingId: 'l1', userId: 'u2', checkIn: '2026-10-11', checkOut: '2026-10-12', guests: 1,
    }),
  });
  expect(overlapping.status).toBe(409);
  const body = await overlapping.json();
  expect(body.message).toMatch(/no longer available/i);
});

test('POST /api/bookings allows a non-overlapping range for the same listing', async () => {
  const first = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      listingId: 'l1', userId: 'u1', checkIn: '2026-10-10', checkOut: '2026-10-13', guests: 1,
    }),
  });
  expect(first.status).toBe(201);

  const adjacent = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      listingId: 'l1', userId: 'u2', checkIn: '2026-10-13', checkOut: '2026-10-15', guests: 1,
    }),
  });
  expect(adjacent.status).toBe(201);
});
