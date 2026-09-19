import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListingGrid from './ListingGrid';

const listing = {
  id: 'l1', title: 'Test Loft', pricePerNight: 100, rating: 4.5, reviewCount: 10,
  images: ['https://example.com/a.jpg'], location: { city: 'Paris', country: 'France' },
};

function renderGrid(props) {
  return render(
    <MemoryRouter>
      <ListingGrid listings={[]} status="idle" error={null} {...props} />
    </MemoryRouter>
  );
}

test('shows skeletons while loading', () => {
  renderGrid({ status: 'loading' });
  expect(screen.getAllByTestId('listing-skeleton').length).toBeGreaterThan(0);
});

test('shows listing cards on success', () => {
  renderGrid({ status: 'success', listings: [listing] });
  expect(screen.getByText('Test Loft')).toBeInTheDocument();
  expect(screen.getByText('Paris, France')).toBeInTheDocument();
});

test('shows an empty state when there are no results', () => {
  renderGrid({ status: 'success', listings: [] });
  expect(screen.getByText(/no listings found/i)).toBeInTheDocument();
});

test('shows an error state on failure', () => {
  renderGrid({ status: 'error', error: 'Network error' });
  expect(screen.getByText(/network error/i)).toBeInTheDocument();
});
