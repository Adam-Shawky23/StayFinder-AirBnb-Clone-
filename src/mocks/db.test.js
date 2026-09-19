import { beforeEach, expect, test } from 'vitest';
import { getDb, updateDb } from './db';

beforeEach(() => {
  localStorage.clear();
});

test('getDb returns an empty seeded shape when nothing is stored', () => {
  const db = getDb();
  expect(db).toEqual({ users: [], bookings: [], wishlist: [] });
});

test('updateDb mutates and persists the database', () => {
  updateDb((db) => {
    db.bookings.push({ id: 'b1' });
  });
  expect(getDb().bookings).toEqual([{ id: 'b1' }]);
});
