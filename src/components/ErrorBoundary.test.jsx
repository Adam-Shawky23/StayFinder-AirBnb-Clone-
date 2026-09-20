import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

function Boom() {
  throw new Error('boom');
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

test('renders children when nothing throws', () => {
  render(
    <ErrorBoundary>
      <p>All good</p>
    </ErrorBoundary>
  );
  expect(screen.getByText('All good')).toBeInTheDocument();
});

test('shows a fallback page instead of crashing when a child throws', () => {
  render(
    <ErrorBoundary>
      <Boom />
    </ErrorBoundary>
  );
  expect(screen.getByRole('heading', { name: /this page hit a snag/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
});
