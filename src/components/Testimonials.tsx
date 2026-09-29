import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import { useMotionTier } from '../lib/motion';

const testimonials = [
  {
    quote:
      "Nisha handled my ITR and GST filings perfectly. She explained everything clearly and helped me claim deductions I didn't know about. Saved me both time and money.",
    name: 'Rohit Mehra',
    role: 'Freelance Designer, Delhi',
    result: '₹38k extra refund',
  },
  {
    quote:
      'As a small business owner, GST compliance used to stress me out. Nisha set up proper processes and now everything is on autopilot. Highly professional and responsive.',
    name: 'Priya Sharma',
    role: 'Founder, Studio Kala',
    result: 'Zero notices in 18 months',
  },
  {
    quote:
      'Nisha supported our company registration and ongoing tax filings. Her attention to detail is exceptional. We now use her for all compliance needs.',
    name: 'Ankit & Meera',
    role: 'Co-founders, Tech Startup',
    result: 'On time, every quarter',
  },
];

const initials = (name: string) =>
  name
    .split(/\s|&/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const tier = useMotionTier();

  // Auto-advance only when motion is allowed and the user isn't interacting.
  useEffect(() => {
    if (tier === 'none' || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [tier, paused]);

  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  return (
    <section aria-label="Client testimonials" className="bg-paper py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow justify-center mb-10">Kind words from clients</p>
        </Reveal>

        <div
          className="relative grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {testimonials.map((t, i) => {
            const active = i === index;
            return (
              <figure
                key={t.name}
                data-active={active}
                aria-hidden={!active}
                className={`quote-slide [grid-area:1/1] text-center ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <span className="block font-display text-[120px] leading-[0.6] text-accent/25 select-none" aria-hidden>
                  “
                </span>
                <blockquote className="font-display text-[26px] sm:text-[38px] lg:text-[46px] leading-[1.2] tracking-[-0.015em] text-ink max-w-5xl mx-auto">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <span className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg">
                      {initials(t.name)}
                    </span>
                    <span className="text-left">
                      <span className="block font-semibold text-ink">{t.name}</span>
                      <span className="block text-sm text-ink-soft">{t.role}</span>
                    </span>
                  </span>
                  <span className="hidden sm:block w-px h-10 bg-line" />
                  <span className="rounded-full bg-accent-soft text-accent text-sm font-semibold px-4 py-2">{t.result}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-5">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="h-11 flex items-center"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-ink' : 'w-4 bg-ink/20 hover:bg-ink/40'}`} />
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
