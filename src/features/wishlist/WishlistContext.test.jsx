import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, expect, test } from 'vitest';
import { AuthProvider, useAuth } from '../auth/AuthContext';
import { WishlistProvider, useWishlist } from './WishlistContext';
import { updateDb } from '../../mocks/db';
import { server } from '../../test/server';

function wrapper({ children }) {
  return (
    <AuthProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </AuthProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
});

test('toggling a listing adds and removes it from the wishlist', async () => {
  const { result } = renderHook(
    () => ({ auth: useWishlist() }),
    { wrapper }
  );

  // Log in first via a second hook instance sharing the same providers is awkward in a
  // single renderHook call, so this test logs in through localStorage directly to
  // simulate an existing session, then remounts.
  localStorage.setItem(
    'stayfinder_auth',
    JSON.stringify({ user: { id: 'u1', email: 'demo@stayfinder.com' }, token: 't' })
  );

  const { result: result2 } = renderHook(() => useWishlist(), { wrapper });

  await waitFor(() => expect(result2.current.listingIds).toEqual([]));

  await act(async () => {
    await result2.current.toggle({ id: 'l1' });
  });
  await waitFor(() => expect(result2.current.isWishlisted('l1')).toBe(true));

  await act(async () => {
    await result2.current.toggle({ id: 'l1' });
  });
  await waitFor(() => expect(result2.current.isWishlisted('l1')).toBe(false));
});

test('logging out while the initial fetch is in flight does not repopulate the wishlist with the stale user\'s data', async () => {
  // Seed a wishlist entry for u1 so the in-flight GET (fired on mount) would
  // resolve with a non-empty list if it were allowed to land after logout.
  updateDb((db) => {
    db.wishlist.push({ userId: 'u1', listingId: 'l1' });
  });
  localStorage.setItem(
    'stayfinder_auth',
    JSON.stringify({ user: { id: 'u1', email: 'demo@stayfinder.com' }, token: 't' })
  );

  const { result } = renderHook(() => ({ auth: useAuth(), wishlist: useWishlist() }), { wrapper });

  // Log out immediately, before the mocked 400ms latency on the initial
  // GET /api/wishlist for u1 has had a chance to resolve.
  act(() => {
    result.current.auth.logout();
  });

  expect(result.current.wishlist.listingIds).toEqual([]);

  // Wait comfortably past the mocked GET latency to let the stale in-flight
  // request for u1 settle, then confirm it never repopulated the list.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
  });

  expect(result.current.wishlist.listingIds).toEqual([]);
});

test('toggle rolls back the optimistic update when the server request fails', async () => {
  localStorage.setItem(
    'stayfinder_auth',
    JSON.stringify({ user: { id: 'u1', email: 'demo@stayfinder.com' }, token: 't' })
  );

  const { result } = renderHook(() => useWishlist(), { wrapper });

  await waitFor(() => expect(result.current.listingIds).toEqual([]));

  server.use(
    http.post('/api/wishlist', () => HttpResponse.json({ message: 'Server error' }, { status: 500 }))
  );

  await act(async () => {
    await result.current.toggle({ id: 'l1' });
  });

  // The optimistic add should have been rolled back after the POST failed.
  expect(result.current.isWishlisted('l1')).toBe(false);
});
