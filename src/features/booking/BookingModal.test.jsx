import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { AuthProvider } from '../auth/AuthContext';
import BookingModal from './BookingModal';

const listing = {
  id: 'l1', title: 'Test Loft', pricePerNight: 100, maxGuests: 3,
};

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    'stayfinder_auth',
    JSON.stringify({ user: { id: 'u1', name: 'Demo User', email: 'demo@stayfinder.com' }, token: 't' })
  );

  // Freeze "today" so the calendar deterministically opens on September 2026,
  // regardless of when this suite actually runs. shouldAdvanceTime keeps real
  // wall-clock time flowing for things like MSW's simulated network delay(),
  // while still letting us pin the "current date" the calendar reads.
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(new Date('2026-09-19T12:00:00'));
});

afterEach(() => {
  vi.useRealTimers();
});

test('shows a price breakdown once a date range is picked, and confirms a booking', async () => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(
    <MemoryRouter>
      <AuthProvider>
        <BookingModal open onClose={() => {}} listing={listing} />
      </AuthProvider>
    </MemoryRouter>
  );

  // The calendar opens on the current month; navigate forward to October 2026
  // so the target dates are on screen before selecting them.
  await user.click(await screen.findByRole('button', { name: /next month/i }));

  // react-day-picker v10 renders day buttons with an accessible name built from
  // date-fns' "PPPP" format, e.g. "Saturday, October 10th, 2026" (not the
  // "10 October 2026" shape the original plan assumed).
  await user.click(await screen.findByRole('button', { name: /October 10th, 2026/i }));
  await user.click(screen.getByRole('button', { name: /October 13th, 2026/i }));

  expect(await screen.findByText(/\$376/)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /reserve/i }));

  await waitFor(() => expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument());
});
