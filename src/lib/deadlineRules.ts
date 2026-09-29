/**
 * Standard statutory due dates for an Indian financial year.
 *
 * These are the *default* dates. The source of truth is the Supabase table
 * `compliance_deadlines`, which Nisha edits from /meadmindeadlines (extensions,
 * new rules, removals). This list is used to:
 *   1. pre-fill that table for a new FY ("Load standard dates" in admin), and
 *   2. keep the home page populated if the database is unreachable.
 *
 * No imports on purpose — the Supabase seed script reuses this file.
 */

export type DeadlineKind = 'GST' | 'Income Tax' | 'TDS' | 'Other';
export const DEADLINE_KINDS: DeadlineKind[] = ['GST', 'Income Tax', 'TDS', 'Other'];

export interface Deadline {
  id?: number;
  title: string;
  who: string;
  kind: DeadlineKind;
  /** YYYY-MM-DD */
  due_date: string;
  /** Set when the date was extended/shifted: the date it was originally due. */
  original_date?: string | null;
  note?: string | null;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const toISODate = (y: number, m: number, d: number) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

/** Parse YYYY-MM-DD as a local date (no timezone shift). */
export const parseISODate = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

/** FY start year for a date: Apr 2026 – Mar 2027 → 2026. */
export const fyStartFor = (date: Date) => (date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1);

export const fyLabel = (fyStart: number) => `FY ${fyStart}-${String((fyStart + 1) % 100).padStart(2, '0')}`;

/** Every standard due date that falls between 1 Apr `fyStart` and 31 Mar `fyStart + 1`. */
export function standardDeadlines(fyStart: number): Deadline[] {
  const out: Deadline[] = [];
  // Calendar year of a month (1-12) inside this FY
  const yr = (m: number) => (m >= 4 ? fyStart : fyStart + 1);
  const prevMonth = (m: number) => {
    const pm = m === 1 ? 12 : m - 1;
    return `${MONTHS[pm - 1]} ${yr(m) - (m === 1 ? 1 : 0)}`;
  };
  const add = (title: string, who: string, kind: DeadlineKind, m: number, d: number, note: string) =>
    out.push({ title, who, kind, due_date: toISODate(yr(m), m, d), original_date: null, note });

  const months = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
  const prevFY = fyLabel(fyStart - 1);

  // Monthly
  for (const m of months) {
    add('GSTR-1', 'Monthly GST filers', 'GST', m, 11, `For ${prevMonth(m)}`);
    add('GSTR-3B', 'Monthly GST filers', 'GST', m, 20, `For ${prevMonth(m)}`);
    if (m === 4) add('TDS / TCS deposit', 'Deductors & collectors', 'TDS', 4, 30, `For ${prevMonth(4)}`);
    else add('TDS / TCS deposit', 'Deductors & collectors', 'TDS', m, 7, `For ${prevMonth(m)}`);
  }

  // Quarterly
  const quarters: [number, string][] = [[4, 'Jan–Mar'], [7, 'Apr–Jun'], [10, 'Jul–Sep'], [1, 'Oct–Dec']];
  for (const [m, q] of quarters) {
    add('GSTR-1 (QRMP)', 'Quarterly GST filers', 'GST', m, 13, `For ${q} quarter`);
    add('CMP-08', 'Composition taxpayers', 'GST', m, 18, `For ${q} quarter`);
  }
  const tdsReturns: [number, string][] = [[5, 'Q4 (Jan–Mar)'], [7, 'Q1 (Apr–Jun)'], [10, 'Q2 (Jul–Sep)'], [1, 'Q3 (Oct–Dec)']];
  for (const [m, q] of tdsReturns) add('TDS quarterly return', 'Deductors', 'TDS', m, 31, q);

  const advance: [number, string][] = [[6, '1st instalment — 15%'], [9, '2nd instalment — 45%'], [12, '3rd instalment — 75%'], [3, 'Final instalment — 100%']];
  for (const [m, n] of advance) add('Advance tax', 'Individuals & businesses', 'Income Tax', m, 15, n);

  // Yearly
  add('GSTR-4 annual return', 'Composition taxpayers', 'GST', 4, 30, `For ${prevFY}`);
  add('ITR filing', 'Individuals (non-audit)', 'Income Tax', 7, 31, `For ${prevFY}`);
  add('Tax audit report', 'Businesses under audit', 'Income Tax', 9, 30, `For ${prevFY}`);
  add('ITR filing', 'Audit cases', 'Income Tax', 10, 31, `For ${prevFY}`);
  add('GSTR-9 annual return', 'Registered GST taxpayers', 'GST', 12, 31, `For ${prevFY}`);

  return out.sort((a, b) => a.due_date.localeCompare(b.due_date));
}

/** Upcoming standard dates from today, spanning into next FY when needed. */
export function upcomingStandardDeadlines(today: Date, count: number): Deadline[] {
  const fy = fyStartFor(today);
  const todayISO = toISODate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  return [...standardDeadlines(fy), ...standardDeadlines(fy + 1)].filter((d) => d.due_date >= todayISO).slice(0, count);
}
