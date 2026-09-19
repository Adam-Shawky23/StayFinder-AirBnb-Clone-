import { render, screen } from '@testing-library/react';
import ReviewList from './ReviewList';

test('renders reviews for the given listing', async () => {
  render(<ReviewList listingId="l1" />);
  expect(await screen.findByText(/exactly as described/i)).toBeInTheDocument();
});
