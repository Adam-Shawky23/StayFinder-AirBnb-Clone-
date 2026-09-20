import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import Breadcrumbs from './Breadcrumbs';

test('renders earlier crumbs as links and the last crumb as plain current-page text', () => {
  render(
    <MemoryRouter>
      <Breadcrumbs
        items={[{ label: 'Home', to: '/' }, { label: 'Search', to: '/search' }, { label: 'Sunlit Loft' }]}
      />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '/search');

  const current = screen.getByText('Sunlit Loft');
  expect(current.tagName).toBe('SPAN');
  expect(current).toHaveAttribute('aria-current', 'page');
});
