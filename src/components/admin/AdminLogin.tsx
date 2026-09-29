import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

/** Login card shared by admin pages. */
const AdminLogin = ({ onLogin }: { onLogin: (email: string, password: string) => Promise<string | null> }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const err = await onLogin(email, password);
    setBusy(false);
    if (err) setError(err);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] pt-16 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Admin Login</h1>

        {!supabase && (
          <p className="mb-4 p-3 rounded-lg bg-amber-50 text-amber-700 text-sm">
            Blog backend is not configured. Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to enable login.
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={busy || !supabase}
            className="w-full bg-[#0e7490] text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {busy ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <RouterLink to="/" className="text-sm text-[#0e7490] hover:underline">
            Back to site
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
