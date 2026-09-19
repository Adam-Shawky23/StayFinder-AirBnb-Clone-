import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Button from '../../components/ui/Button';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('demo@stayfinder.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname || '/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <label className="block text-sm">
        <span className="text-gray-600">Email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </label>
      <label className="block text-sm">
        <span className="text-gray-600">Password</span>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </label>
      <p className="text-xs text-gray-500">Demo account: demo@stayfinder.com / password123</p>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Logging in…' : 'Log in'}
      </Button>
      <p className="text-center text-sm text-gray-500">
        No account? <Link to="/signup" className="text-brand-600">Sign up</Link>
      </p>
    </form>
  );
}
