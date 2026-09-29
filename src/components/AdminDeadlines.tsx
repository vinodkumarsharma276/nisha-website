import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CalendarPlus, Download, Pencil, RefreshCw, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../lib/useAdminAuth';
import { DEADLINES_TABLE } from '../lib/deadlines';
import {
  DEADLINE_KINDS,
  fyLabel,
  fyStartFor,
  parseISODate,
  standardDeadlines,
  toISODate,
  type Deadline,
  type DeadlineKind,
} from '../lib/deadlineRules';
import AdminLogin from './admin/AdminLogin';

type Row = Deadline & { id: number };
type View = 'upcoming' | 'fy' | 'past';

const KIND_STYLES: Record<DeadlineKind, string> = {
  GST: 'bg-amber-100 text-amber-800',
  'Income Tax': 'bg-teal-100 text-teal-800',
  TDS: 'bg-indigo-100 text-indigo-800',
  Other: 'bg-gray-100 text-gray-700',
};

const emptyForm: Deadline = { title: '', who: '', kind: 'GST', due_date: '', original_date: null, note: '' };

const fmt = (iso: string) => parseISODate(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const fyRange = (fy: number) => [toISODate(fy, 4, 1), toISODate(fy + 1, 3, 31)] as const;

const AdminDeadlines = () => {
  const { isAuthenticated, authChecked, login, logout } = useAdminAuth();

  const today = useMemo(() => new Date(), []);
  const todayISO = toISODate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const currentFY = fyStartFor(today);

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [view, setView] = useState<View>('upcoming');
  const [fy, setFy] = useState(currentFY);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Deadline | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase.from(DEADLINES_TABLE).select('*').order('due_date', { ascending: true });
    if (err) setError(err.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) load();
  }, [isAuthenticated]);

  const visible = useMemo(() => {
    if (view === 'upcoming') return rows.filter((r) => r.due_date >= todayISO);
    if (view === 'past') return rows.filter((r) => r.due_date < todayISO).reverse();
    const [from, to] = fyRange(fy);
    return rows.filter((r) => r.due_date >= from && r.due_date <= to);
  }, [rows, view, fy, todayISO]);

  // Group by month for readability
  const groups = useMemo(() => {
    const map = new Map<string, Row[]>();
    for (const r of visible) {
      const key = parseISODate(r.due_date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      map.set(key, [...(map.get(key) ?? []), r]);
    }
    return [...map.entries()];
  }, [visible]);

  const countInFY = (year: number) => {
    const [from, to] = fyRange(year);
    return rows.filter((r) => r.due_date >= from && r.due_date <= to).length;
  };

  // In Feb–Mar, remind Nisha to load next year's dates if she hasn't yet.
  const upcomingFY = currentFY + 1;
  const nextFYMissing = [1, 2].includes(today.getMonth()) && !loading && countInFY(upcomingFY) === 0;

  const loadStandard = async (year: number) => {
    if (!supabase) return;
    const std = standardDeadlines(year);
    // Skip anything already present — including dates that were since extended.
    const toAdd = std.filter(
      (s) => !rows.some((r) => r.title === s.title && r.who === s.who && (r.due_date === s.due_date || r.original_date === s.due_date)),
    );
    if (toAdd.length === 0) {
      setNotice(`All standard dates for ${fyLabel(year)} are already loaded.`);
      return;
    }
    if (!window.confirm(`Add ${toAdd.length} standard due dates for ${fyLabel(year)}? You can edit or delete any of them afterwards.`)) return;
    setError('');
    const { error: err } = await supabase.from(DEADLINES_TABLE).insert(toAdd.map((d) => ({ title: d.title, who: d.who, kind: d.kind, due_date: d.due_date, note: d.note })));
    if (err) {
      setError(err.message);
      return;
    }
    setNotice(`Added ${toAdd.length} dates for ${fyLabel(year)}${toAdd.length < std.length ? ` (${std.length - toAdd.length} were already there)` : ''}.`);
    setFy(year);
    setView('fy');
    load();
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm });
  };

  const openEdit = (r: Row) => {
    setEditing(r);
    setForm({ ...r, note: r.note ?? '', original_date: r.original_date ?? null });
  };

  const onDueDateChange = (value: string) => {
    if (!form) return;
    // Moving an existing date records where it was originally due → shows "Extended" on the site.
    const original = editing && !form.original_date && value && value !== editing.due_date ? editing.due_date : form.original_date;
    setForm({ ...form, due_date: value, original_date: original === value ? null : original });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !form) return;
    setSaving(true);
    setError('');
    const payload = {
      title: form.title.trim(),
      who: (form.who ?? '').trim(),
      kind: form.kind,
      due_date: form.due_date,
      original_date: form.original_date || null,
      note: form.note?.trim() || null,
    };
    const { error: err } = editing
      ? await supabase.from(DEADLINES_TABLE).update(payload).eq('id', editing.id)
      : await supabase.from(DEADLINES_TABLE).insert([payload]);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setNotice(editing ? `Updated "${payload.title}".` : `Added "${payload.title}".`);
    setForm(null);
    setEditing(null);
    load();
  };

  const remove = async (r: Row) => {
    if (!supabase) return;
    if (!window.confirm(`Delete "${r.title}" due ${fmt(r.due_date)}?`)) return;
    const { error: err } = await supabase.from(DEADLINES_TABLE).delete().eq('id', r.id);
    if (err) {
      setError(err.message);
      return;
    }
    setRows((prev) => prev.filter((x) => x.id !== r.id));
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] pt-16 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <AdminLogin onLogin={login} />;

  const input = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]';

  return (
    <div className="min-h-screen bg-[#f1f5f9] pt-16">
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        {/* Header */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a]">Compliance Deadlines</h1>
            <p className="text-sm text-gray-500 mt-1">
              Shown on the home page calendar. Move a date when the government extends it — the site shows “Extended”.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <RouterLink to="/meadminblogs" className="text-sm text-[#0e7490] hover:underline">Articles</RouterLink>
            <RouterLink to="/meadminmessages" className="text-sm text-[#0e7490] hover:underline">Messages</RouterLink>
            <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
          </div>
        </div>

        {nextFYMissing && (
          <div className="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex flex-wrap items-center justify-between gap-3">
            <span>{fyLabel(upcomingFY)} starts soon and its dates aren't loaded yet.</span>
            <button onClick={() => loadStandard(upcomingFY)} className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-medium hover:opacity-90">
              Load {fyLabel(upcomingFY)} dates
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex flex-wrap items-center gap-3">
          <div className="flex gap-1.5">
            {(
              [
                ['upcoming', 'Upcoming'],
                ['fy', 'Financial year'],
                ['past', 'Past'],
              ] as [View, string][]
            ).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  view === v ? 'bg-[#0f172a] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0e7490]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            value={fy}
            onChange={(e) => {
              setFy(Number(e.target.value));
              setView('fy');
            }}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
            aria-label="Financial year"
          >
            {[currentFY - 1, currentFY, currentFY + 1].map((y) => (
              <option key={y} value={y}>
                {fyLabel(y)} ({countInFY(y)})
              </option>
            ))}
          </select>

          <div className="ml-auto flex flex-wrap gap-2">
            <button
              onClick={() => loadStandard(fy)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:border-[#0e7490] hover:text-[#0e7490]"
              title="Adds the usual statutory dates for this FY; skips ones already added"
            >
              <Download className="w-4 h-4" /> Load standard dates for {fyLabel(fy)}
            </button>
            <button onClick={openAdd} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-[#0e7490] text-white font-medium hover:opacity-90">
              <CalendarPlus className="w-4 h-4" /> Add deadline
            </button>
            <button onClick={load} disabled={loading} className="p-2 text-gray-500 hover:text-[#0e7490] disabled:opacity-50" aria-label="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}
        {notice && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm flex justify-between gap-3">
            {notice}
            <button onClick={() => setNotice('')} aria-label="Dismiss">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {loading && <p className="text-center text-gray-500 py-8">Loading deadlines...</p>}

        {!loading && visible.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            {rows.length === 0 ? (
              <>
                No deadlines yet.{' '}
                <button onClick={() => loadStandard(currentFY)} className="text-[#0e7490] font-medium hover:underline">
                  Load the standard dates for {fyLabel(currentFY)}
                </button>{' '}
                to get started.
              </>
            ) : (
              'Nothing to show for this view.'
            )}
          </div>
        )}

        {/* Grouped list */}
        <div className="space-y-6">
          {groups.map(([month, items]) => (
            <div key={month}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{month}</h2>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {items.map((r) => {
                  const extended = !!r.original_date && r.original_date !== r.due_date;
                  const past = r.due_date < todayISO;
                  return (
                    <div key={r.id} className={`flex items-center gap-4 p-4 ${past ? 'opacity-60' : ''}`}>
                      <div className="w-12 text-center shrink-0">
                        <div className="text-2xl font-bold text-[#0f172a] leading-none">{parseISODate(r.due_date).getDate()}</div>
                        <div className="text-[11px] uppercase text-gray-500 mt-1">
                          {parseISODate(r.due_date).toLocaleDateString('en-IN', { month: 'short' })}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-[#0f172a]">{r.title}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${KIND_STYLES[r.kind] ?? KIND_STYLES.Other}`}>{r.kind}</span>
                          {extended && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-800">
                              Extended from {fmt(r.original_date!)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {r.who}
                          {r.note ? ` · ${r.note}` : ''}
                        </p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => openEdit(r)}
                          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#0e7490] hover:text-[#0e7490]"
                          aria-label={`Edit ${r.title}`}
                          title="Edit / extend"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => remove(r)}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                          aria-label={`Delete ${r.title}`}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <RouterLink to="/" className="text-sm text-[#0e7490] hover:underline">Back to site</RouterLink>
        </div>
      </div>

      {/* Add / edit modal */}
      {form && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setForm(null)}>
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0f172a]">{editing ? 'Edit deadline' : 'Add deadline'}</h2>
              <button type="button" onClick={() => setForm(null)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Close">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required maxLength={120} className={input} placeholder="e.g. GSTR-3B" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applies to</label>
                <input value={form.who} onChange={(e) => setForm({ ...form, who: e.target.value })} maxLength={120} className={input} placeholder="e.g. Monthly GST filers" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as DeadlineKind })} className={`${input} bg-white`}>
                  {DEADLINE_KINDS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due date *</label>
                <input type="date" value={form.due_date} onChange={(e) => onDueDateChange(e.target.value)} required className={input} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Originally due (if extended)</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={form.original_date ?? ''}
                    onChange={(e) => setForm({ ...form, original_date: e.target.value || null })}
                    className={input}
                  />
                  {form.original_date && (
                    <button type="button" onClick={() => setForm({ ...form, original_date: null })} className="px-2 text-sm text-gray-500 hover:text-red-600" title="Not an extension">
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 -mt-2">
              Changing the due date of an existing deadline fills “Originally due” automatically, and the website shows it as extended.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <input
                value={form.note ?? ''}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                maxLength={160}
                className={input}
                placeholder="e.g. For Aug 2026 · Extended by CBDT Circular 12/2026"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setForm(null)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="px-5 py-2 text-sm rounded-lg bg-[#0e7490] text-white font-medium hover:opacity-90 disabled:opacity-60">
                {saving ? 'Saving...' : editing ? 'Save changes' : 'Add deadline'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDeadlines;
