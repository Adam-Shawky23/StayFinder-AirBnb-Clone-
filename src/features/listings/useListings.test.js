import { renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { afterEach, expect, test } from 'vitest';
import { server } from '../../test/server';
import { useListings } from './useListings';

afterEach(() => server.resetHandlers());

test('surfaces a friendly error, not a raw parser error, when the API returns HTML instead of JSON', async () => {
  // Reproduces the real-world failure mode: the mock service worker doesn't
  // intercept the request, so the app's own index.html comes back with a 200.
  server.use(
    http.get('/api/listings', () => new HttpResponse('<!doctype html><html>...</html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    }))
  );

  const { result } = renderHook(() => useListings());

  await waitFor(() => expect(result.current.status).toBe('error'));
  expect(result.current.error).toBe("Couldn't load this right now. Try refreshing the page.");
  expect(result.current.error).not.toMatch(/unexpected token/i);
});
