/**
 * Prints SQL that loads the standard due dates for one financial year into
 * `compliance_deadlines`. Rows that already exist (same title + who + date,
 * or already extended from that date) are skipped, so it is safe to re-run.
 *
 *   node scripts/deadline-seed.ts 2026 > supabase/seed_deadlines_fy2026-27.sql
 *
 * (Nisha can also do this from the admin page: Deadlines → "Load standard dates".)
 */
import { fyLabel, standardDeadlines } from '../src/lib/deadlineRules.ts';

const fy = Number(process.argv[2]);
if (!Number.isInteger(fy) || fy < 2000) {
  console.error('Usage: node scripts/deadline-seed.ts <FY start year, e.g. 2026>');
  process.exit(1);
}

const q = (s: string | null | undefined) => (s == null ? 'null' : `'${s.replace(/'/g, "''")}'`);
const rows = standardDeadlines(fy)
  .map((d) => `  (${q(d.title)}, ${q(d.who)}, ${q(d.kind)}, date ${q(d.due_date)}, ${q(d.note)})`)
  .join(',\n');

console.log(`-- Standard compliance due dates for ${fyLabel(fy)} (1 Apr ${fy} – 31 Mar ${fy + 1}).
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Run supabase/schema.sql first. Safe to re-run: existing rows are skipped.
insert into public.compliance_deadlines (title, who, kind, due_date, note)
select v.title, v.who, v.kind, v.due_date, v.note
from (values
${rows}
) as v(title, who, kind, due_date, note)
where not exists (
  select 1 from public.compliance_deadlines c
  where c.title = v.title and c.who = v.who
    and (c.due_date = v.due_date or c.original_date = v.due_date)
);`);
