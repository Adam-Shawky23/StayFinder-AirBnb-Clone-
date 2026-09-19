const STORAGE_KEY = 'stayfinder_mock_db_v1';

function emptyDb() {
  return { users: [], bookings: [], wishlist: [] };
}

export function getDb() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyDb();
  try {
    return { ...emptyDb(), ...JSON.parse(raw) };
  } catch {
    return emptyDb();
  }
}

export function updateDb(mutator) {
  const db = getDb();
  mutator(db);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  return db;
}
