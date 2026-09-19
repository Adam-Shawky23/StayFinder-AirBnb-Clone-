import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ListingDetailPage from './ListingDetailPage';
import { AuthProvider } from '../features/auth/AuthContext';
import { WishlistProvider } from '../features/wishlist/WishlistContext';

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/listing/${id}`]}>
      <AuthProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/listing/:id" element={<ListingDetailPage />} />
          </Routes>
        </WishlistProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

test('renders listing title, price, and amenities after loading', async () => {
  renderDetail('l1');
  expect(await screen.findByRole('heading', { name: /sunlit loft near the louvre/i })).toBeInTheDocument();
  expect(screen.getByText(/145/)).toBeInTheDocument();
  expect(screen.getByText('Wifi')).toBeInTheDocument();
});

test('shows a not-found message for an unknown listing id', async () => {
  renderDetail('does-not-exist');
  expect(await screen.findByText(/listing not found/i)).toBeInTheDocument();
});
