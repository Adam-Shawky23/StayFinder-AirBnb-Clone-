import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Button from '../../components/ui/Button';
import { useToast } from '../toast/ToastContext';

export default function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signup(name, email, password);
      showToast(`Welcome, ${name}!`);
      navigate('/');
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
        <span className="text-stone-600">Name</span>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100" />
      </label>
      <label className="block text-sm">
        <span className="text-stone-600">Email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100" />
      </label>
      <label className="block text-sm">
        <span className="text-stone-600">Password</span>
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100" />
      </label>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Creating account…' : 'Sign up'}
      </Button>
      <p className="text-center text-sm text-stone-500">
        Already have an account? <Link to="/login" className="text-brand-600">Log in</Link>
      </p>
    </form>
  );
}
