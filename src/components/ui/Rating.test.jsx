import { render, screen } from '@testing-library/react';
import Rating from './Rating';

test('shows the numeric rating and review count', () => {
  render(<Rating value={4.87} reviewCount={128} />);
  expect(screen.getByText('4.87')).toBeInTheDocument();
  expect(screen.getByText(/128 reviews/i)).toBeInTheDocument();
});

test('omits the review count when not provided', () => {
  render(<Rating value={4.5} />);
  expect(screen.queryByText(/reviews/i)).not.toBeInTheDocument();
});
