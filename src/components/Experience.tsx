import { Youtube, PenLine, Check } from 'lucide-react';
import Reveal from './ui/Reveal';

const journey = [
  {
    tag: 'Articleship',
    place: 'Akas & Associates',
    text: 'Intensive, hands-on training across income tax, tax audit and statutory compliance for a wide range of clients.',
  },
  {
    tag: 'Articleship',
    place: 'V D Tiwari & Co.',
    text: 'Practical GST registrations and returns, company incorporation and direct client handling, end to end.',
  },
  {
    tag: 'Today',
    place: 'Independent practice, Delhi',
    text: 'Working directly with individuals, freelancers and growing businesses — one point of contact from first call to final filing.',
  },
];

const capabilities = [
  'ITR & tax audit experience from leading CA firms',
  'GST registration, returns & ongoing compliance',
  'Company incorporation & post-registration support',
  'Financial analysis and clear, readable reporting',
];

const Experience = () => (
  <section id="about" className="relative bg-paper py-24 lg:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14 lg:gap-16">
      {/* Left: intro (sticky on desktop) */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <p className="eyebrow mb-5">About Nisha</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-[38px] sm:text-[52px] leading-[1.04] tracking-[-0.02em] text-ink">
              Big-firm training. <em>Personal</em> attention.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
              My articleship at two established CA firms gave me real-world training in taxation, audit and compliance. I now bring those same
              battle-tested processes to every client — without the layers of a big firm between you and the person doing your work.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              I also break down tax rules in plain language on YouTube and Medium, so you understand what's being filed and why.
            </p>
          </Reveal>
          <Reveal delay={280} className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://youtube.com/@finsightswithnisha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors"
            >
              <Youtube className="w-4 h-4 text-red-600" /> Finsights with Nisha
            </a>
            <a
              href="https://medium.com/@nishashrm75"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors"
            >
              <PenLine className="w-4 h-4" /> Articles on Medium
            </a>
          </Reveal>
        </div>
      </div>

      {/* Right: journey timeline + capabilities */}
      <div className="lg:col-span-7">
        <ol className="relative border-l border-line ml-3">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.place} delay={i * 120} variant="right" className="relative pl-10 pb-12 last:pb-0">
              <span
                className={`absolute -left-[9px] top-1.5 w-[17px] h-[17px] rounded-full border-4 border-paper ${
                  j.tag === 'Today' ? 'bg-accent' : 'bg-ink'
                }`}
              />
              <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-accent">{j.tag}</p>
              <h3 className="mt-2 font-display text-[28px] sm:text-[32px] leading-tight text-ink">{j.place}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed max-w-lg">{j.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mt-14 rounded-3xl bg-white border border-line p-7 sm:p-9">
          <p className="font-display text-2xl text-ink">What that training means for you</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] text-ink-soft leading-snug">
                <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-accent-soft text-accent flex items-center justify-center">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Experience;
