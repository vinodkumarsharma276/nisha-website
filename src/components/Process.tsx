import { useEffect, useRef } from 'react';
import { CalendarCheck, Search, FileCheck2, TrendingUp } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { useMotionTier } from '../lib/motion';

const steps = [
  {
    icon: CalendarCheck,
    title: 'Book & understand',
    description: 'A focused first conversation. I learn about your income sources, business, goals and anything that is worrying you.',
  },
  {
    icon: Search,
    title: 'Review & plan',
    description: 'I review your current setup, spot tax-saving opportunities and compliance gaps, and share a clear plan with the fee upfront.',
  },
  {
    icon: FileCheck2,
    title: 'Execute & file',
    description: 'Accurate filing of your ITR, GST returns, audit or registration — with every document shared and explained.',
  },
  {
    icon: TrendingUp,
    title: 'Support all year',
    description: 'Reminders before due dates, proactive planning and a real person to message, so tax season never becomes a surprise.',
  },
];

const Process = () => {
  const tier = useMotionTier();
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // Scroll-linked progress line (full motion only; otherwise it's drawn complete).
  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    if (tier !== 'full') {
      fill.style.transform = 'scaleY(1)';
      return;
    }
    let raf = 0;
    const update = () => {
      const r = list.getBoundingClientRect();
      const start = window.innerHeight * 0.7;
      const progress = Math.min(1, Math.max(0, (start - r.top) / r.height));
      fill.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [tier]);

  return (
    <section id="process" className="bg-paper py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  Four simple steps. <em>Zero surprises.</em>
                </>
              }
              intro="A transparent process from the first call to the final acknowledgement — you always know what's happening and what it costs."
            />
            <Reveal delay={240} className="mt-8">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
                Start with step one
              </button>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="lg:col-span-7 relative">
          {/* Track + scroll-linked fill */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-line" aria-hidden />
          <div ref={fillRef} className="process-line absolute left-[27px] top-4 bottom-4 w-px bg-accent" style={{ transform: 'scaleY(0)' }} aria-hidden />

          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative pl-20 pb-14 last:pb-0">
              <span className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-white border border-line text-accent flex items-center justify-center shadow-[0_10px_30px_-18px_rgba(11,31,51,0.4)]">
                <step.icon className="w-6 h-6" />
              </span>
              <p className="font-display text-sm text-ink-soft/70">Step 0{i + 1}</p>
              <h3 className="mt-1 font-display text-[28px] sm:text-[34px] leading-tight text-ink">{step.title}</h3>
              <p className="mt-3 text-[16.5px] text-ink-soft leading-relaxed max-w-lg">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
