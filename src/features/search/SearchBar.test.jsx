import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SearchBar from './SearchBar';

test('resyncs displayed fields when initialValues changes externally (e.g. back/forward nav)', () => {
  const { rerender } = render(
    <SearchBar initialValues={{ location: 'Paris', checkIn: '', checkOut: '', guests: 1 }} onSearch={vi.fn()} />
  );
  expect(screen.getByPlaceholderText('Search destinations')).toHaveValue('Paris');

  rerender(
    <SearchBar initialValues={{ location: 'Tokyo', checkIn: '', checkOut: '', guests: 2 }} onSearch={vi.fn()} />
  );

  expect(screen.getByPlaceholderText('Search destinations')).toHaveValue('Tokyo');
  expect(screen.getByLabelText('Guests')).toHaveValue(2);
});
