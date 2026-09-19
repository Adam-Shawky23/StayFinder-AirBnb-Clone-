import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';
import { AuthProvider } from '../auth/AuthContext';
import { WishlistProvider, useWishlist } from './WishlistContext';

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
