import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import QuickFilterChips from './QuickFilterChips';

const baseFilters = { amenities: [], maxPrice: '' };

test('toggles an amenity chip on and off', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<QuickFilterChips filters={baseFilters} onChange={onChange} />);

  await user.click(screen.getByRole('button', { name: 'Pool' }));
  expect(onChange).toHaveBeenCalledWith({ amenities: ['Pool'] });

  onChange.mockClear();
  render(<QuickFilterChips filters={{ ...baseFilters, amenities: ['Pool'] }} onChange={onChange} />);
  await user.click(screen.getAllByRole('button', { name: 'Pool' })[1]);
  expect(onChange).toHaveBeenCalledWith({ amenities: [] });
});

test('marks the active price chip as pressed and clears it on a second click', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const { rerender } = render(<QuickFilterChips filters={baseFilters} onChange={onChange} />);

  const chip = screen.getByRole('button', { name: 'Under $100' });
  expect(chip).toHaveAttribute('aria-pressed', 'false');

  await user.click(chip);
  expect(onChange).toHaveBeenCalledWith({ maxPrice: '100' });

  rerender(<QuickFilterChips filters={{ ...baseFilters, maxPrice: '100' }} onChange={onChange} />);
  expect(screen.getByRole('button', { name: 'Under $100' })).toHaveAttribute('aria-pressed', 'true');

  await user.click(screen.getByRole('button', { name: 'Under $100' }));
  expect(onChange).toHaveBeenLastCalledWith({ maxPrice: '' });
});
