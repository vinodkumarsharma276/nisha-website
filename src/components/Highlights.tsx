import { Sparkle } from 'lucide-react';
import CountUp from './ui/CountUp';
import Reveal from './ui/Reveal';

const ticker = [
  'Income Tax Returns',
  'GST Registration',
  'GSTR-1 & 3B Filing',
  'Tax Audit',
  'Tax Planning',
  'Company Incorporation',
  'LLP Registration',
  'Bookkeeping',
  'Notices & Appeals',
];

const stats = [
  { value: 2, suffix: '+', label: 'Years of hands-on practice' },
  { value: 100, suffix: '+', label: 'Individuals & businesses served' },
  { value: 2, suffix: '', label: 'Leading CA firms trained at' },
  { value: 24, suffix: 'h', label: 'Reply time on every enquiry' },
];

const Highlights = () => (
  <section aria-label="Highlights" className="bg-ink text-paper">
    {/* Ticker — scrolls on capable devices, wraps statically otherwise */}
    <div className="marquee overflow-hidden border-b border-white/10 py-5">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {ticker.map((t) => (
              <li key={t} className="flex items-center gap-8 pr-8 font-display font-semibold tracking-[-0.01em] text-2xl sm:text-[26px] text-paper/90 whitespace-nowrap">
                {t}
                <Sparkle className="w-4 h-4 text-[#7fd1c3]" fill="currentColor" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 90} className={`px-2 sm:px-6 ${i % 2 === 1 ? 'border-l border-white/10' : ''} ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
          <div className="font-display text-5xl sm:text-6xl tracking-tight">
            <CountUp to={s.value} suffix={s.suffix} />
          </div>
          <p className="mt-2 text-sm text-paper/60 max-w-[180px]">{s.label}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Highlights;
