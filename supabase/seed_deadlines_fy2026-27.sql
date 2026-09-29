-- Standard compliance due dates for FY 2026-27 (1 Apr 2026 – 31 Mar 2027).
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Run supabase/schema.sql first. Safe to re-run: existing rows are skipped.
insert into public.compliance_deadlines (title, who, kind, due_date, note)
select v.title, v.who, v.kind, v.due_date, v.note
from (values
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-04-11', 'For Mar 2026'),
  ('GSTR-1 (QRMP)', 'Quarterly GST filers', 'GST', date '2026-04-13', 'For Jan–Mar quarter'),
  ('CMP-08', 'Composition taxpayers', 'GST', date '2026-04-18', 'For Jan–Mar quarter'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-04-20', 'For Mar 2026'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-04-30', 'For Mar 2026'),
  ('GSTR-4 annual return', 'Composition taxpayers', 'GST', date '2026-04-30', 'For FY 2025-26'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-05-07', 'For Apr 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-05-11', 'For Apr 2026'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-05-20', 'For Apr 2026'),
  ('TDS quarterly return', 'Deductors', 'TDS', date '2026-05-31', 'Q4 (Jan–Mar)'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-06-07', 'For May 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-06-11', 'For May 2026'),
  ('Advance tax', 'Individuals & businesses', 'Income Tax', date '2026-06-15', '1st instalment — 15%'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-06-20', 'For May 2026'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-07-07', 'For Jun 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-07-11', 'For Jun 2026'),
  ('GSTR-1 (QRMP)', 'Quarterly GST filers', 'GST', date '2026-07-13', 'For Apr–Jun quarter'),
  ('CMP-08', 'Composition taxpayers', 'GST', date '2026-07-18', 'For Apr–Jun quarter'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-07-20', 'For Jun 2026'),
  ('TDS quarterly return', 'Deductors', 'TDS', date '2026-07-31', 'Q1 (Apr–Jun)'),
  ('ITR filing', 'Individuals (non-audit)', 'Income Tax', date '2026-07-31', 'For FY 2025-26'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-08-07', 'For Jul 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-08-11', 'For Jul 2026'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-08-20', 'For Jul 2026'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-09-07', 'For Aug 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-09-11', 'For Aug 2026'),
  ('Advance tax', 'Individuals & businesses', 'Income Tax', date '2026-09-15', '2nd instalment — 45%'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-09-20', 'For Aug 2026'),
  ('Tax audit report', 'Businesses under audit', 'Income Tax', date '2026-09-30', 'For FY 2025-26'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-10-07', 'For Sep 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-10-11', 'For Sep 2026'),
  ('GSTR-1 (QRMP)', 'Quarterly GST filers', 'GST', date '2026-10-13', 'For Jul–Sep quarter'),
  ('CMP-08', 'Composition taxpayers', 'GST', date '2026-10-18', 'For Jul–Sep quarter'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-10-20', 'For Sep 2026'),
  ('TDS quarterly return', 'Deductors', 'TDS', date '2026-10-31', 'Q2 (Jul–Sep)'),
  ('ITR filing', 'Audit cases', 'Income Tax', date '2026-10-31', 'For FY 2025-26'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-11-07', 'For Oct 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-11-11', 'For Oct 2026'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-11-20', 'For Oct 2026'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2026-12-07', 'For Nov 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2026-12-11', 'For Nov 2026'),
  ('Advance tax', 'Individuals & businesses', 'Income Tax', date '2026-12-15', '3rd instalment — 75%'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2026-12-20', 'For Nov 2026'),
  ('GSTR-9 annual return', 'Registered GST taxpayers', 'GST', date '2026-12-31', 'For FY 2025-26'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2027-01-07', 'For Dec 2026'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2027-01-11', 'For Dec 2026'),
  ('GSTR-1 (QRMP)', 'Quarterly GST filers', 'GST', date '2027-01-13', 'For Oct–Dec quarter'),
  ('CMP-08', 'Composition taxpayers', 'GST', date '2027-01-18', 'For Oct–Dec quarter'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2027-01-20', 'For Dec 2026'),
  ('TDS quarterly return', 'Deductors', 'TDS', date '2027-01-31', 'Q3 (Oct–Dec)'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2027-02-07', 'For Jan 2027'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2027-02-11', 'For Jan 2027'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2027-02-20', 'For Jan 2027'),
  ('TDS / TCS deposit', 'Deductors & collectors', 'TDS', date '2027-03-07', 'For Feb 2027'),
  ('GSTR-1', 'Monthly GST filers', 'GST', date '2027-03-11', 'For Feb 2027'),
  ('Advance tax', 'Individuals & businesses', 'Income Tax', date '2027-03-15', 'Final instalment — 100%'),
  ('GSTR-3B', 'Monthly GST filers', 'GST', date '2027-03-20', 'For Feb 2027')
) as v(title, who, kind, due_date, note)
where not exists (
  select 1 from public.compliance_deadlines c
  where c.title = v.title and c.who = v.who
    and (c.due_date = v.due_date or c.original_date = v.due_date)
);
