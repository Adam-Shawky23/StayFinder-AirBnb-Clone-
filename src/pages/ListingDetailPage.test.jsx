import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ListingDetailPage from './ListingDetailPage';

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/listing/${id}`]}>
      <Routes>
        <Route path="/listing/:id" element={<ListingDetailPage />} />
      </Routes>
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
