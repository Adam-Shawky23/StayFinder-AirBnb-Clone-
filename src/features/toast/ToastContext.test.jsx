import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { ToastProvider, useToast } from './ToastContext';

function TriggerButton() {
  const { showToast } = useToast();
  return <button onClick={() => showToast('Saved to wishlist')}>Trigger</button>;
}

test('shows a toast when showToast is called, and it disappears on its own', async () => {
  const user = userEvent.setup();
  render(
    <ToastProvider>
      <TriggerButton />
    </ToastProvider>
  );

  expect(screen.queryByText('Saved to wishlist')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Trigger' }));
  expect(screen.getByText('Saved to wishlist')).toBeInTheDocument();

  await waitFor(() => expect(screen.queryByText('Saved to wishlist')).not.toBeInTheDocument(), { timeout: 4000 });
}, 6000);

test('useToast without a provider no-ops instead of throwing', () => {
  render(<TriggerButton />);
  expect(() => screen.getByRole('button', { name: 'Trigger' }).click()).not.toThrow();
});
