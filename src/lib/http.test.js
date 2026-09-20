import { HttpResponse, http } from 'msw';
import { afterEach, expect, test } from 'vitest';
import { server } from '../test/server';
import { fetchJson } from './http';

afterEach(() => server.resetHandlers());

test('throws a friendly message instead of a raw parser error when the response is HTML, not JSON', async () => {
  server.use(
    http.get('/api/listings', () => new HttpResponse('<!doctype html><html>...</html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    }))
  );

  await expect(fetchJson('/api/listings')).rejects.toThrow("Couldn't load this right now. Try refreshing the page.");
});

test('returns the parsed body and response for a real JSON reply', async () => {
  server.use(http.get('/api/ping', () => HttpResponse.json({ ok: true })));

  const { res, data } = await fetchJson('/api/ping');
  expect(res.ok).toBe(true);
  expect(data).toEqual({ ok: true });
});
