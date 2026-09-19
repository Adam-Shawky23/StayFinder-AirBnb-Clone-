import { expect, test } from 'vitest';

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
