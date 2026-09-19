import { render, screen } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';
import { AuthProvider } from '../features/auth/AuthContext';
import TripsPage from './TripsPage';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    'stayfinder_auth',
    JSON.stringify({ user: { id: 'u1', name: 'Demo User', email: 'demo@stayfinder.com' }, token: 't' })
  );
});

test('shows an empty state when the user has no bookings', async () => {
  render(<AuthProvider><TripsPage /></AuthProvider>);
  expect(await screen.findByText(/no trips booked yet/i)).toBeInTheDocument();
});
