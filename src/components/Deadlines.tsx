import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BellRing } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { fetchUpcomingDeadlines } from '../lib/deadlines';
import { parseISODate, upcomingStandardDeadlines, type Deadline, type DeadlineKind } from '../lib/deadlineRules';

const DAY = 86_400_000;

const kindStyle: Record<DeadlineKind, string> = {
  GST: 'bg-[#fbf1dd] text-[#8a6320]',
  'Income Tax': 'bg-accent-soft text-accent',
  TDS: 'bg-[#e8ecf6] text-[#34487a]',
  Other: 'bg-sand text-ink-soft',
};

const shortDate = (iso: string) => parseISODate(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

const Deadlines = () => {
  const today = useMemo(() => new Date(), []);
  // Render standard dates instantly, then swap in Nisha's curated list from Supabase.
  const [items, setItems] = useState<Deadline[]>(() => upcomingStandardDeadlines(today, 5));

  useEffect(() => {
    let alive = true;
    fetchUpcomingDeadlines(5).then(({ items }) => {
      if (alive) setItems(items);
    });
    return () => {
      alive = false;
    };
  }, []);

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  return (
    <section aria-labelledby="deadlines-title" className="bg-sand/60 border-y border-line py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Compliance calendar"
            title={
              <span id="deadlines-title">
                Never miss a <em>due date</em> again.
              </span>
            }
            intro="The next statutory deadlines, kept up to date — including government extensions. Clients get a reminder well before each one that applies to them."
          />
          <Reveal delay={240} className="mt-8">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors"
            >
              Get help with an upcoming filing <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>

        <Reveal delay={120} variant="scale" className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-line shadow-[0_30px_70px_-45px_rgba(11,31,51,0.5)] overflow-hidden">
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-line">
              <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <BellRing className="w-4 h-4 text-accent" /> Coming up
              </span>
              <span className="text-xs text-ink-soft">
                Today · {today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <ul>
              {items.map((d, i) => {
                const date = parseISODate(d.due_date);
                const days = Math.round((date.getTime() - startOfToday) / DAY);
                const urgent = days <= 7;
                const extended = !!d.original_date && d.original_date !== d.due_date;
                return (
                  <Reveal
                    as="li"
                    key={d.id ?? `${d.title}-${d.who}-${d.due_date}`}
                    delay={200 + i * 90}
                    className="flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-5 border-b border-line last:border-b-0 hover:bg-paper/70 transition-colors"
                  >
                    <div className="w-14 shrink-0 text-center">
                      <div className="font-display text-3xl leading-none text-ink">{date.getDate()}</div>
                      <div className="text-[11px] uppercase tracking-wider text-ink-soft mt-1">
                        {date.toLocaleDateString('en-IN', { month: 'short' })}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-ink">{d.title}</span>
                        <span className={`text-[10.5px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 ${kindStyle[d.kind] ?? kindStyle.Other}`}>
                          {d.kind}
                        </span>
                        {extended && (
                          <span className="text-[10.5px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 bg-[#fde7df] text-[#b4451f]">
                            Extended from {shortDate(d.original_date!)}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-ink-soft mt-0.5 truncate">
                        {d.who}
                        {d.note ? ` · ${d.note}` : ''}
                      </div>
                    </div>
                    <div className={`shrink-0 text-right text-sm font-semibold ${urgent ? 'text-[#b4451f]' : 'text-ink'}`}>
                      {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `in ${days} days`}
                    </div>
                  </Reveal>
                );
              })}
            </ul>
            <p className="px-6 sm:px-8 py-4 bg-paper/70 text-[12px] text-ink-soft leading-relaxed">
              Dates reflect the latest CBDT / GST Council notifications known to us. Please confirm before filing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Deadlines;
