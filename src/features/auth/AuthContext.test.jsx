import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

beforeEach(() => {
  localStorage.clear();
});

test('logs in a seeded demo user and persists the session', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

  await act(async () => {
    await result.current.login('demo@stayfinder.com', 'password123');
  });

  await waitFor(() => expect(result.current.user).not.toBeNull());
  expect(result.current.user.email).toBe('demo@stayfinder.com');
  expect(JSON.parse(localStorage.getItem('stayfinder_auth')).user.email).toBe('demo@stayfinder.com');
});

test('rejects an invalid login', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

  await expect(
    act(async () => {
      await result.current.login('nope@stayfinder.com', 'wrong');
    })
  ).rejects.toThrow();
  expect(result.current.user).toBeNull();
});

test('logout clears the session', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
  await act(async () => {
    await result.current.login('demo@stayfinder.com', 'password123');
  });
  act(() => result.current.logout());
  expect(result.current.user).toBeNull();
  expect(localStorage.getItem('stayfinder_auth')).toBeNull();
});
