import { supabase } from './supabase';
import { toISODate, upcomingStandardDeadlines, type Deadline } from './deadlineRules';

export const DEADLINES_TABLE = 'compliance_deadlines';

/**
 * Next `count` deadlines from today. Reads Nisha's curated list from Supabase;
 * falls back to the standard statutory dates if the database is unavailable
 * or has nothing upcoming yet (e.g. the new FY hasn't been loaded).
 */
export async function fetchUpcomingDeadlines(count = 5): Promise<{ items: Deadline[]; source: 'db' | 'standard' }> {
  const today = new Date();
  const fallback = { items: upcomingStandardDeadlines(today, count), source: 'standard' as const };
  if (!supabase) return fallback;

  const todayISO = toISODate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const { data, error } = await supabase
    .from(DEADLINES_TABLE)
    .select('id, title, who, kind, due_date, original_date, note')
    .gte('due_date', todayISO)
    .order('due_date', { ascending: true })
    .limit(count);

  if (error) {
    console.error('Failed to load deadlines, using standard dates', error);
    return fallback;
  }
  if (!data || data.length === 0) return fallback;

  const items = data as Deadline[];
  // Near FY end the curated list may run short before next year is loaded —
  // top it up with standard dates that fall after the last curated one.
  if (items.length < count) {
    const last = items[items.length - 1].due_date;
    const extra = upcomingStandardDeadlines(today, 60).filter((d) => d.due_date > last);
    items.push(...extra.slice(0, count - items.length));
  }
  return { items, source: 'db' };
}
