import { useState, useEffect, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Mail, RefreshCw, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const STATUSES = ['new', 'in_progress', 'resolved', 'archived'] as const;

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  archived: 'Archived',
};

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
  archived: 'bg-gray-200 text-gray-600',
};

const AdminMessages = () => {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | (typeof STATUSES)[number]>('all');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
      setAuthChecked(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadMessages = async () => {
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    setMessages((data as ContactMessage[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) loadMessages();
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!supabase) {
      setLoginError('Blog backend is not configured.');
      return;
    }
    setIsLoggingIn(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoggingIn(false);
    if (err) {
      setLoginError(err.message || 'Invalid email or password');
      return;
    }
    setIsAuthenticated(true);
    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const updateStatus = async (id: number, status: string) => {
    if (!supabase) return;
    const previous = messages;
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    const { error: err } = await supabase.from('contact_messages').update({ status }).eq('id', id);
    if (err) {
      setError(err.message);
      setMessages(previous);
    }
  };

  const handleDelete = async (id: number) => {
    if (!supabase) return;
    if (!window.confirm('Delete this message? This cannot be undone.')) return;
    const { error: err } = await supabase.from('contact_messages').delete().eq('id', id);
    if (err) {
      setError(err.message);
      return;
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setSelected((prev) => (prev && prev.id === id ? null : prev));
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: messages.length };
    for (const s of STATUSES) c[s] = messages.filter((m) => m.status === s).length;
    return c;
  }, [messages]);

  const visible = useMemo(
    () => (filter === 'all' ? messages : messages.filter((m) => m.status === filter)),
    [messages, filter],
  );

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] pt-16 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] pt-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Admin Login</h1>

          {!supabase && (
            <p className="mb-4 p-3 rounded-lg bg-amber-50 text-amber-700 text-sm">
              Blog backend is not configured. Set <code>VITE_SUPABASE_URL</code> and{' '}
              <code>VITE_SUPABASE_ANON_KEY</code> to enable login.
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={isLoggingIn || !supabase}
              className="w-full bg-[#0e7490] text-white py-3 rounded-lg font-medium hover:bg-[#0e7490] transition disabled:opacity-60"
            >
              {isLoggingIn ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <RouterLink to="/" className="text-sm text-[#0e7490] hover:underline">Back to site</RouterLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] pt-16">
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a]">Contact Messages</h1>
            <p className="text-sm text-gray-500 mt-1">{messages.length} total</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadMessages}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0e7490] disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <RouterLink to="/meadminblogs" className="text-sm text-[#0e7490] hover:underline">Manage Articles</RouterLink>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                filter === s ? 'bg-[#0f172a] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0e7490]'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_LABELS[s]} ({counts[s] ?? 0})
            </button>
          ))}
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}
        {loading && <p className="text-center text-gray-500 py-8">Loading messages...</p>}
        {!loading && visible.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            No messages{filter !== 'all' ? ` with status "${STATUS_LABELS[filter]}"` : ''} yet.
          </div>
        )}

        <div className="space-y-3">
          {visible.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelected(m)}
              className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-[#0e7490] transition"
            >
              <div className="flex flex-wrap gap-3 justify-between items-start">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[m.status] || 'bg-gray-100 text-gray-700'}`}>
                      {STATUS_LABELS[m.status] || m.status}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(m.created_at).toLocaleString()}</span>
                  </div>
                  <p className="font-semibold text-[#0f172a] break-words">{m.subject}</p>
                  <p className="text-sm text-gray-500">
                    {m.name} ·{' '}
                    <a
                      href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#0e7490] hover:underline inline-flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" /> {m.email}
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={m.status}
                    onChange={(e) => updateStatus(m.id, e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                    aria-label="Change status"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition"
                    aria-label="Delete message"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-gray-600 text-sm line-clamp-2 break-words">{m.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <RouterLink to="/" className="text-sm text-[#0e7490] hover:underline">Back to site</RouterLink>
        </div>

        {selected && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[selected.status] || 'bg-gray-100 text-gray-700'}`}>
                      {STATUS_LABELS[selected.status] || selected.status}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(selected.created_at).toLocaleString()}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#0f172a] break-words">{selected.subject}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-[#0f172a]">{selected.name}</span> ·{' '}
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="text-[#0e7490] hover:underline inline-flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" /> {selected.email}
                  </a>
                </div>

                <div className="whitespace-pre-wrap break-words text-gray-800 leading-relaxed">
                  {selected.message}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                  <label className="text-sm text-gray-500">Status</label>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-[#0e7490] text-white hover:opacity-90 transition"
                  >
                    <Mail className="w-4 h-4" /> Reply
                  </a>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
