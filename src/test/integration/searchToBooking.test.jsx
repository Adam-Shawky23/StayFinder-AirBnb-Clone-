import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import App from '../../App';
import { AuthProvider } from '../../features/auth/AuthContext';
import { WishlistProvider } from '../../features/wishlist/WishlistContext';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();

  // Freeze "today" so the calendar deterministically opens on September 2026,
  // regardless of when this suite actually runs (same pattern as
  // BookingModal.test.jsx). shouldAdvanceTime keeps real wall-clock time
  // flowing for MSW's simulated network delay(), while pinning the date the
  // calendar reads as "current".
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(new Date('2026-09-19T12:00:00'));
});

afterEach(() => {
  vi.useRealTimers();
});

test('a visitor can search, open a listing, log in, and complete a booking', async () => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  renderApp('/search');

  // Search for Paris
  const whereInput = await screen.findByPlaceholderText(/search destinations/i);
  await user.type(whereInput, 'Paris');
  await user.click(screen.getByRole('button', { name: /search/i }));

  // Open the first Paris listing
  const listingLink = await screen.findByRole('link', { name: /sunlit loft near the louvre/i });
  await user.click(listingLink);

  // Not logged in yet — should see the login prompt instead of Reserve
  expect(await screen.findByText(/to book this stay/i)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /^reserve$/i })).not.toBeInTheDocument();

  // Log in. There are two "Log in" links visible at once here — the header
  // nav link and the inline prompt's link — either navigates to /login, so
  // grab whichever the DOM turns up last (the inline, page-specific one).
  const loginLinks = screen.getAllByRole('link', { name: /^log in$/i });
  await user.click(loginLinks[loginLinks.length - 1]);
  await user.clear(screen.getByLabelText(/email/i));
  await user.type(screen.getByLabelText(/email/i), 'demo@stayfinder.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /^log in$/i }));

  // Back on the listing page (redirected to "from"), reserve is now available
  await user.click(await screen.findByRole('button', { name: /^reserve$/i }));

  // The calendar opens on the current month (frozen to September 2026);
  // navigate forward to October 2026 so the target dates are on screen.
  await user.click(await screen.findByRole('button', { name: /next month/i }));

  // react-day-picker v10 renders day buttons with an accessible name built
  // from date-fns' "PPPP" format, e.g. "Saturday, October 10th, 2026".
  await user.click(await screen.findByRole('button', { name: /October 10th, 2026/i }));
  await user.click(screen.getByRole('button', { name: /October 13th, 2026/i }));

  // The modal is rendered alongside the page (not a portal that hides the
  // rest of the tree), so the aside's "Reserve" button and the modal's
  // submit "Reserve" button coexist — take the one that appears later in
  // the DOM (the modal's).
  const reserveButtons = screen.getAllByRole('button', { name: /^reserve$/i });
  await user.click(reserveButtons[reserveButtons.length - 1]);

  await waitFor(() => expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument());
}, 15000);
