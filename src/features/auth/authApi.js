import { fetchJson } from '../../lib/http';

export async function login(email, password) {
  const { res, data } = await fetchJson('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(data?.message || 'Login failed');
  return data;
}

export async function signup(name, email, password) {
  const { res, data } = await fetchJson('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error(data?.message || 'Signup failed');
  return data;
}
