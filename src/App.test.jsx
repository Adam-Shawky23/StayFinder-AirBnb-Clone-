import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the home page at /', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: /stayfinder/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /find your next stay/i })).toBeInTheDocument();
});

test('renders a 404 page for unknown routes', () => {
  render(
    <MemoryRouter initialEntries={['/nope']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});
