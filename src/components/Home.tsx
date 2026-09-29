import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowRight, CheckCircle2, FileCheck2, Receipt, Star } from 'lucide-react';
import { hasFinePointer, useMotionTier } from '../lib/motion';

// Generic workspace photo (Unsplash licence — free to use, no attribution required).
const heroPhoto = 'https://images.unsplash.com/photo-1588091210060-1ee4fab270ae';
const heroSrc = (w: number) => `${heroPhoto}?w=${w}&q=75&auto=format&fit=crop&crop=entropy&ar=4:5`;

// Headline split into words so each can rise from a mask. `em` words get the accent colour.
const headline: { w: string; em?: boolean; br?: boolean }[] = [
  { w: 'Tax' },
  { w: '&' },
  { w: 'compliance,', br: true },
  { w: 'handled' },
  { w: 'with' },
  { w: 'care', em: true },
  { w: '&' },
  { w: 'precision.', em: true },
];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Home = () => {
  const tier = useMotionTier();
  const stageRef = useRef<HTMLDivElement>(null);

  // Pointer parallax on the photo stack — only on capable devices with a mouse.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || tier !== 'full' || !hasFinePointer()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / r.width;
        const y = (e.clientY - (r.top + r.height / 2)) / r.height;
        stage.style.setProperty('--px', x.toFixed(3));
        stage.style.setProperty('--py', y.toFixed(3));
      });
    };
    const reset = () => {
      stage.style.setProperty('--px', '0');
      stage.style.setProperty('--py', '0');
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', reset);
    };
  }, [tier]);

  const layer = (depth: number): CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
    transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
  });

  return (
    <section id="home" className="relative overflow-hidden bg-paper grain pt-[72px]">
      {/* Background: grid + drifting colour blobs (blobs render only on capable devices) */}
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      <div className="blob w-[420px] h-[420px] bg-[#bfe3da] -top-24 right-[8%]" aria-hidden />
      <div className="blob w-[360px] h-[360px] bg-[#f3dfbd] bottom-0 left-[-6%] [animation-delay:-6s]" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24 grid lg:grid-cols-12 gap-14 lg:gap-8 items-center min-h-[calc(100dvh-72px)]">
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="hero-in inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 backdrop-blur px-3.5 py-1.5 text-[13px] text-ink-soft" style={{ '--d': '0ms' } as CSSProperties}>
            <span className="ping relative inline-block w-2 h-2 rounded-full bg-emerald-500" />
            Accepting new clients · Delhi
          </div>

          <h1 className="font-display text-ink mt-7 text-[44px] leading-[1.02] sm:text-[64px] lg:text-[80px] tracking-[-0.03em]">
            {headline.map((part, i) => (
              <span key={i}>
                <span className="word-mask">
                  <span className={`word ${part.em ? 'serif-accent' : ''}`} style={{ '--i': i } as CSSProperties}>
                    {part.w}
                  </span>
                </span>
                {part.br ? <br className="hidden sm:block" /> : ' '}
              </span>
            ))}
          </h1>

          <p className="hero-in mt-7 max-w-xl text-lg sm:text-xl leading-relaxed text-ink-soft" style={{ '--d': '550ms' } as CSSProperties}>
            I'm Nisha — I help individuals and growing businesses file ITR, stay GST-compliant, plan taxes and register companies.
            Clear pricing, no jargon, and one person who actually knows your file.
          </p>

          <div className="hero-in mt-9 flex flex-col sm:flex-row gap-3" style={{ '--d': '680ms' } as CSSProperties}>
            <button onClick={() => scrollTo('contact')} className="btn-primary">
              Book a free consultation
              <ArrowRight className="arrow w-4 h-4" />
            </button>
            <button onClick={() => scrollTo('services')} className="btn-ghost">
              Explore services
            </button>
          </div>

          {/* Credentials strip */}
          <div className="hero-in mt-12 pt-7 border-t border-line flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8" style={{ '--d': '800ms' } as CSSProperties}>
            <p className="text-[11px] tracking-[0.18em] uppercase text-ink-soft/80 shrink-0">Articleship trained at</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[19px] text-ink/80">
              <span>Akas &amp; Associates</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-ink/30" />
              <span>V D Tiwari &amp; Co.</span>
            </div>
          </div>
        </div>

        {/* Portrait stage */}
        <div ref={stageRef} className="lg:col-span-5 relative mx-auto w-full max-w-[440px]">
          <div className="hero-in relative" style={{ '--d': '250ms' } as CSSProperties}>
            {/* Decorative arch outline behind the photo */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-t-[999px] rounded-b-[32px] border border-accent/25" style={layer(-10)} aria-hidden />

            <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[28px] overflow-hidden bg-sand shadow-[0_40px_80px_-40px_rgba(11,31,51,0.55)]" style={layer(8)}>
              <img
                src={heroSrc(800)}
                srcSet={`${heroSrc(480)} 480w, ${heroSrc(800)} 800w, ${heroSrc(1200)} 1200w`}
                sizes="(min-width: 1024px) 440px, 90vw"
                alt="A tidy desk with a laptop, notebook and coffee"
                width={800}
                height={1000}
                fetchPriority="high"
                className="w-full h-full object-cover scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent" />
            </div>

            {/* Rotating badge */}
            <div className="absolute -top-4 -right-2 sm:-right-8 w-[104px] h-[104px] sm:w-[118px] sm:h-[118px]" style={layer(22)} aria-hidden>
              <div className="relative w-full h-full rounded-full bg-ink text-paper flex items-center justify-center shadow-xl">
                <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 w-full h-full">
                  <defs>
                    <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text fontSize="8.6" letterSpacing="2" fill="currentColor" className="uppercase" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    <textPath href="#badge-circle">Tax · GST · Audit · Compliance ·</textPath>
                  </text>
                </svg>
                <Star className="w-6 h-6 text-[#e7c27d]" fill="currentColor" />
              </div>
            </div>

            {/* Floating status chips */}
            <div className="absolute top-[22%] -left-4 sm:-left-14" style={layer(28)}>
              <div className="float-a flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur border border-line px-4 py-3 shadow-[0_18px_40px_-20px_rgba(11,31,51,0.45)]">
                <span className="w-9 h-9 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
                  <FileCheck2 className="w-[18px] h-[18px]" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink">ITR filed</span>
                  <span className="block text-[11.5px] text-ink-soft">Acknowledgement received</span>
                </span>
              </div>
            </div>

            <div className="absolute bottom-[16%] -right-3 sm:-right-12" style={layer(34)}>
              <div className="float-b flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur border border-line px-4 py-3 shadow-[0_18px_40px_-20px_rgba(11,31,51,0.45)]">
                <span className="w-9 h-9 rounded-xl bg-[#fbf1dd] text-gold flex items-center justify-center">
                  <Receipt className="w-[18px] h-[18px]" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink">GSTR-3B</span>
                  <span className="flex items-center gap-1 text-[11.5px] text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Filed before due date
                  </span>
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 left-4 sm:-left-6" style={layer(18)}>
              <div className="float-c rounded-2xl bg-ink text-paper px-5 py-3.5 shadow-[0_18px_40px_-18px_rgba(11,31,51,0.7)]">
                <span className="block font-display text-3xl leading-none">100+</span>
                <span className="block text-[11.5px] text-paper/70 mt-1">clients served</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
